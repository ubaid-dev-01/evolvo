'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { getFormConfig, type FormField } from '@/lib/form-configs'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type FormValue = string | string[] | File | null

type FieldErrors = Record<string, string>

type ApplicationFormProps = {
  role: string
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.includes(',') ? result.split(',')[1] ?? '' : result
      resolve(base64)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function buildInitialValues(fields: FormField[]): Record<string, FormValue> {
  return fields.reduce<Record<string, FormValue>>((acc, field) => {
    if (field.type === 'checkbox-group') {
      acc[field.name] = []
      return acc
    }
    if (field.type === 'file') {
      acc[field.name] = null
      return acc
    }
    acc[field.name] = ''
    return acc
  }, {})
}

export default function ApplicationForm({ role }: ApplicationFormProps) {
  const formConfig = useMemo(() => getFormConfig(role), [role])

  const [formValues, setFormValues] = useState<Record<string, FormValue>>({})
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(
    null
  )
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    if (!formConfig) {
      return
    }
    setFormValues(buildInitialValues(formConfig.fields))
    setFieldErrors({})
    setStatusMessage(null)
    setStatusType(null)
    setShowSuccessDialog(false)
  }, [formConfig])

  if (!formConfig) {
    return (
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          Role form not configured. Please contact the administrator.
        </div>
      </Card>
    )
  }

  const updateValue = (name: string, value: FormValue) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean
  ) => {
    setFormValues(prev => {
      const existing = Array.isArray(prev[name]) ? prev[name] : []
      const nextValues = checked
        ? [...existing, value]
        : existing.filter(item => item !== value)
      return {
        ...prev,
        [name]: nextValues
      }
    })
  }

  const validateFields = () => {
    const errors: FieldErrors = {}

    formConfig.fields.forEach(field => {
      const value = formValues[field.name]

      if (!field.required) {
        return
      }

      if (field.type === 'checkbox-group') {
        if (!Array.isArray(value) || value.length === 0) {
          errors[field.name] = 'Please select at least one option.'
        }
        return
      }

      if (field.type === 'file') {
        if (!(value instanceof File)) {
          errors[field.name] = 'Please attach your CV.'
          return
        }

        if (value.size > MAX_FILE_SIZE_BYTES) {
          errors[field.name] = 'File size must be 10 MB or less.'
        }

        if (field.accept) {
          const allowed = field.accept
            .split(',')
            .map(type => type.trim().toLowerCase())
          const extension = `.${value.name.split('.').pop()}`.toLowerCase()
          if (!allowed.includes(extension)) {
            errors[field.name] = 'Only PDF, DOC, or DOCX files are allowed.'
          }
        }
        return
      }

      if (typeof value === 'string' && value.trim().length === 0) {
        errors[field.name] = 'This field is required.'
      }
    })

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setStatusMessage(null)
    setStatusType(null)

    if (!validateFields()) {
      setStatusMessage('Please fill in the required fields.')
      setStatusType('error')
      return
    }

    const scriptUrl =
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbxLA8Kbdl5t6IH4Idb34-uXPLeXqfJGm2YlggM_NpxWusHI4b_L6cw6iqtnuqyJoKnaxA/exec'

    setIsSubmitting(true)

    try {
      let cvBase64: string | null = null
      let cvFileName: string | null = null
      const fileField = formConfig.fields.find(f => f.type === 'file')
      if (fileField) {
        const value = formValues[fileField.name]
        if (value instanceof File) {
          cvBase64 = await readFileAsBase64(value)
          cvFileName = value.name
        }
      }

      const payload = new FormData()
      payload.append('role', formConfig.roleLabel)
      payload.append('roleId', formConfig.roleId)
      if (cvBase64 !== null && cvFileName !== null) {
        payload.append('cv', cvBase64)
        payload.append('cvFileName', cvFileName)
      }

      formConfig.fields.forEach(field => {
        const value = formValues[field.name]
        if (field.type === 'file') return
        if (field.type === 'checkbox-group') {
          const selections = Array.isArray(value) ? value : []
          payload.append(field.name, selections.join(', '))
          return
        }
        payload.append(field.name, typeof value === 'string' ? value : '')
      })

      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: payload
      })

      const responseText = await response.text()

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      let result: { success?: boolean; message?: string }
      try {
        result = JSON.parse(responseText) as { success?: boolean; message?: string }
      } catch {
        result = {}
      }

      if (result.success === true) {
        setShowSuccessDialog(true)
        setStatusMessage(null)
        setStatusType(null)
        setFormValues(buildInitialValues(formConfig.fields))
        setFieldErrors({})
      } else {
        setStatusMessage(result.message ?? 'Submission failed. Please try again.')
        setStatusType('error')
      }
    } catch (error) {
      setStatusMessage(
        'Something went wrong while submitting. Please try again.'
      )
      setStatusType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="relative overflow-hidden bg-card/30 backdrop-blur-xl border-border/50 shadow-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative p-6 md:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Application Form</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Role: <span className="text-foreground">{formConfig.roleLabel}</span>
          </p>
        </div>

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-center mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
              </div>
              <DialogTitle className="text-center">
                Application submitted successfully
              </DialogTitle>
              <DialogDescription className="text-center">
                Thank you for applying for the {formConfig.roleLabel} role. Our team will
                review your application and get back to you if there is a good fit.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button type="button" className="w-full sm:w-auto">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {formConfig.fields.map(field => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {field.label}
                {field.required && <span className="text-destructive"> *</span>}
              </label>

              {field.type === 'text' ||
              field.type === 'tel' ||
              field.type === 'url' ? (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(formValues[field.name] as string) || ''}
                  onChange={event => updateValue(field.name, event.target.value)}
                />
              ) : null}

              {field.type === 'select' && field.options ? (
                <Select
                  value={(formValues[field.name] as string) || ''}
                  onValueChange={value => updateValue(field.name, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}

              {field.type === 'radio' && field.options ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {field.options.map(option => (
                    <label
                      key={option.value}
                      className={cn(
                        'flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm',
                        (formValues[field.name] as string) === option.value
                          ? 'bg-accent/10 border-accent/40'
                          : 'bg-background/30'
                      )}
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={
                          (formValues[field.name] as string) === option.value
                        }
                        onChange={() => updateValue(field.name, option.value)}
                        className="accent-primary"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              ) : null}

              {field.type === 'checkbox-group' && field.options ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {field.options.map(option => {
                    const value = formValues[field.name]
                    let checked = false
                    if (Array.isArray(value)) {
                      checked = value.includes(option.value)
                    }
                    return (
                      <label
                        key={option.value}
                        className={cn(
                          'flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm',
                          checked
                            ? 'bg-accent/10 border-accent/40'
                            : 'bg-background/30'
                        )}
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={value =>
                            handleCheckboxChange(
                              field.name,
                              option.value,
                              Boolean(value)
                            )
                          }
                        />
                        <span>{option.label}</span>
                      </label>
                    )
                  })}
                </div>
              ) : null}

              {field.type === 'file' ? (
                <Input
                  type="file"
                  accept={field.accept}
                  onChange={event =>
                    updateValue(field.name, event.target.files?.[0] ?? null)
                  }
                />
              ) : null}

              {fieldErrors[field.name] ? (
                <p className="text-sm text-destructive">
                  {fieldErrors[field.name]}
                </p>
              ) : null}
            </div>
          ))}

          <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
            Accepted file types: PDF, DOC, DOCX. Max size 10 MB.
          </div>

          {statusType === 'error' && statusMessage ? (
            <div
              className={cn(
                'flex items-start gap-2 rounded-md border px-4 py-3 text-sm',
                'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300'
              )}
            >
              <AlertCircle className="mt-0.5 h-4 w-4" />
              <span>{statusMessage}</span>
            </div>
          ) : null}

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </div>
    </Card>
  )
}
