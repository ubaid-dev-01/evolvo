'use client'

import ApplicationForm from '@/components/application-form'
import { Button } from '@/components/ui/button'
import { getJobById } from '@/lib/jobs'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface JobPageClientProps {
  job: {
    id: string
    title: string
    description: string
    formUrl: string
    longDesc?: string
    color: string
  }
}

export default function JobPageClient ({ job }: JobPageClientProps) {
  // Get the full job data including the icon component on the client side
  const fullJob = getJobById(job.id)
  const Icon = fullJob?.icon

  return (
    <div className='min-h-screen bg-background text-foreground overflow-hidden'>
      {/* Animated background gradient */}
      <div className='fixed inset-0 bg-linear-to-br from-accent/5 via-background to-background' />
      <div className='fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent' />

      {/* Grid pattern overlay */}
      <div className='fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem]' />

      <div className='relative'>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='border-b border-border/50 backdrop-blur-xl bg-background/30'
        >
          <div className='container mx-auto px-4 py-6'>
            <div className='flex items-center justify-between'>
              <Link href='/'>
                <motion.div
                  className='flex items-center gap-3 cursor-pointer'
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className='relative'>
                    <div className='absolute inset-0 bg-accent/20 blur-xl rounded-full' />
                    <Image
                      src='/evolvo.png'
                      alt='Evolvo Logo'
                      width={32}
                      height={32}
                      className='w-24 h-24 relative text-accent'
                    />
                  </div>
                </motion.div>
              </Link>

              <Button
                variant='outline'
                className='hidden md:flex items-center gap-2 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-accent/10'
                asChild
              >
                <Link href='/'>
                  <ArrowRight className='w-4 h-4 rotate-180' />
                  Back to All Jobs
                </Link>
              </Button>
            </div>
          </div>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='container mx-auto px-4 py-12'
        >
          <div className='max-w-5xl mx-auto'>
            {/* Back Button Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className='mb-8 md:hidden'
            >
              <Button
                variant='ghost'
                className='hover:bg-accent/10 gap-2'
                asChild
              >
                <Link href='/'>
                  <ArrowRight className='w-4 h-4 rotate-180' />
                  Back to roles
                </Link>
              </Button>
            </motion.div>

            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='text-center mb-10'
            >
              <div className='inline-flex items-center justify-center mb-6'>
                <div className='relative'>
                  <div className='absolute inset-0 bg-accent/20 blur-2xl rounded-full' />
                  <div className='relative bg-accent/10 p-6 rounded-3xl border border-accent/20'>
                    {Icon ? <Icon className='w-12 h-12 text-accent' /> : null}
                  </div>
                </div>
              </div>

              <h1 className='text-4xl md:text-5xl font-bold mb-4 text-balance'>
                {job.title}
              </h1>
              <p className='text-lg text-muted-foreground text-balance max-w-2xl mx-auto'>
                Complete the application form below to join our team
              </p>
            </motion.div>

            {/* Inline Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='relative'
            >
              <ApplicationForm role={job.id} />
            </motion.div>
          </div>
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className='border-t border-border/50 backdrop-blur-xl bg-background/30 mt-20'
        >
          <div className='container mx-auto px-4 py-8'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
              <p className='text-sm text-muted-foreground'>
                © 2026 Evolvo Company. All rights reserved.
              </p>
              <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                <button
                  type='button'
                  className='hover:text-foreground transition-colors'
                >
                  Privacy Policy
                </button>
                <button
                  type='button'
                  className='hover:text-foreground transition-colors'
                >
                  Terms of Service
                </button>
                <button
                  type='button'
                  className='hover:text-foreground transition-colors'
                >
                  Careers
                </button>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
