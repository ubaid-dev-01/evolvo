export type Option = {
  label: string
  value: string
}

export type FieldType =
  | 'text'
  | 'tel'
  | 'url'
  | 'select'
  | 'radio'
  | 'checkbox-group'
  | 'file'

export type FormField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  options?: Option[]
  placeholder?: string
  accept?: string
}

export type FormConfig = {
  roleId: string
  roleLabel: string
  fields: FormField[]
}

const yesNoOptions: Option[] = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

const fileAccept = '.pdf,.doc,.docx'

const formConfigs: Record<string, FormConfig> = {
  'full-stack-developer': {
    roleId: 'full-stack-developer',
    roleLabel: 'Fullstack Developer',
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        name: 'whatsAppNumber',
        label: 'WhatsApp Number',
        type: 'tel',
        required: true,
        placeholder: 'e.g. +92 300 1234567'
      },
      {
        name: 'onSiteAvailability',
        label: 'Available for On-Site Role?',
        type: 'radio',
        required: true,
        options: yesNoOptions
      },
      {
        name: 'totalExperience',
        label: 'Total Years of Development Experience',
        type: 'select',
        required: true,
        options: [
          { label: '3–4 years', value: '3-4 years' },
          { label: '5–7 years', value: '5-7 years' },
          { label: '7+ years', value: '7+ years' }
        ]
      },
      {
        name: 'casinoProjects',
        label: 'Comfortable to work on Casino Projects?',
        type: 'radio',
        required: true,
        options: yesNoOptions
      },
      {
        name: 'primaryTechStack',
        label: 'Primary Tech Stack (Select all that apply)',
        type: 'checkbox-group',
        required: true,
        options: [
          { label: 'MongoDB', value: 'MongoDB' },
          { label: 'Express.js', value: 'Express.js' },
          { label: 'React.js', value: 'React.js' },
          { label: 'Node.js', value: 'Node.js' },
          { label: 'Python', value: 'Python' },
          { label: 'Next.js', value: 'Next.js' }
        ]
      },
      {
        name: 'highTrafficExperience',
        label:
          'Have you worked on production-level or high-traffic systems before?',
        type: 'radio',
        required: true,
        options: yesNoOptions
      },
      {
        name: 'cloudDevopsExperience',
        label: 'Experience with Cloud / DevOps (Select all that apply)',
        type: 'checkbox-group',
        required: true,
        options: [
          { label: 'AWS', value: 'AWS' },
          { label: 'Docker', value: 'Docker' },
          { label: 'CI/CD', value: 'CI/CD' },
          { label: 'None', value: 'None' }
        ]
      },
      {
        name: 'portfolioLink',
        label: 'Portfolio / GitHub Link',
        type: 'url',
        required: true,
        placeholder: 'https://github.com/username'
      },
      {
        name: 'expectedSalary',
        label: 'Expected Monthly Salary',
        type: 'text',
        required: true,
        placeholder: 'e.g. 150,000 PKR'
      },
      {
        name: 'cvFile',
        label: 'Attach Your CV',
        type: 'file',
        required: true,
        accept: fileAccept
      }
    ]
  },
  'meta-expert': {
    roleId: 'meta-expert',
    roleLabel: 'Expert Meta Marketer',
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        name: 'whatsAppNumber',
        label: 'Whatsapp Number',
        type: 'tel',
        required: true,
        placeholder: 'e.g. +92 300 1234567'
      },
      {
        name: 'metaAdsExperience',
        label:
          'Total years of hands-on, active experience managing Meta Ads',
        type: 'select',
        required: true,
        options: [
          { label: 'Less than 3 years', value: 'Less than 3 years' },
          { label: '3–4 years', value: '3-4 years' },
          { label: '5–7 years', value: '5-7 years' },
          { label: '8+ years', value: '8+ years' }
        ]
      },
      {
        name: 'campaignOptimizationRating',
        label:
          'Rate your expertise in optimizing and scaling high-spend lead-generation campaigns on Meta (1–10)',
        type: 'select',
        required: true,
        options: Array.from({ length: 10 }, (_, index) => {
          const value = String(index + 1)
          return { label: value, value }
        })
      },
      {
        name: 'aiCreativeProficiency',
        label: 'Proficiency level with AI-based creative workflows',
        type: 'select',
        required: true,
        options: [
          { label: 'No experience', value: 'No experience' },
          { label: 'Basic', value: 'Basic' },
          { label: 'Experienced', value: 'Experienced' },
          { label: 'Expert', value: 'Expert' }
        ]
      },
      {
        name: 'expectedSalary',
        label: 'Expected Monthly Salary (in PKR)',
        type: 'text',
        required: true,
        placeholder: 'e.g. 180,000 PKR'
      },
      {
        name: 'onSiteAvailability',
        label: 'Available for On-Site in Multan?',
        type: 'radio',
        required: true,
        options: yesNoOptions
      },
      {
        name: 'cvFile',
        label: 'Upload Your CV',
        type: 'file',
        required: true,
        accept: fileAccept
      }
    ]
  },
  'php-developer': {
    roleId: 'php-developer',
    roleLabel: 'PHP Developer',
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        name: 'whatsAppNumber',
        label: 'WhatsApp Number',
        type: 'tel',
        required: true,
        placeholder: 'e.g. +92 300 1234567'
      },
      {
        name: 'onSiteAvailability',
        label: 'Available for On-Site Role?',
        type: 'radio',
        required: true,
        options: yesNoOptions
      },
      {
        name: 'phpExperience',
        label: 'Total PHP Experience (in years)',
        type: 'select',
        required: true,
        options: [
          { label: '1–2', value: '1-2' },
          { label: '3–4', value: '3-4' },
          { label: '5+', value: '5+' }
        ]
      },
      {
        name: 'keitaroExperience',
        label: 'Have you worked with Keitaro before?',
        type: 'select',
        required: true,
        options: [
          { label: 'Yes production', value: 'Yes production' },
          { label: 'Yes basic', value: 'Yes basic' },
          { label: 'No', value: 'No' }
        ]
      },
      {
        name: 'funnelsWithPhp',
        label: 'Have you built funnels or prelanders using PHP?',
        type: 'radio',
        required: true,
        options: yesNoOptions
      },
      {
        name: 'funnelsWorkType',
        label: 'Type of work regarding funnels/prelanders (Select all that apply)',
        type: 'checkbox-group',
        required: true,
        options: [
          { label: 'PHP-based prelanders', value: 'PHP-based prelanders' },
          { label: 'Redirect & tracking logic', value: 'Redirect & tracking logic' },
          { label: 'Form handling', value: 'Form handling' },
          { label: 'Lead capture & validation', value: 'Lead capture & validation' }
        ]
      },
      {
        name: 'crmApiIntegration',
        label: 'Have you integrated CRMs using API before?',
        type: 'radio',
        required: true,
        options: yesNoOptions
      },
      {
        name: 'cvFile',
        label: 'Attach Your CV',
        type: 'file',
        required: true,
        accept: fileAccept
      }
    ]
  }
}

export function getFormConfig(roleId: string): FormConfig | undefined {
  return formConfigs[roleId]
}
