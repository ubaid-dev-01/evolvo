'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { jobRoles } from '@/lib/jobs'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HiringPage () {
  return (
    <div className='min-h-screen bg-background text-foreground overflow-hidden'>
      {/* Animated background gradient */}
      <div className='fixed inset-0 bg-gradient-to-br from-accent/5 via-background to-background' />
      <div className='fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent' />

      {/* Grid pattern overlay */}
      <div className='fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]' />

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
              <motion.div
                className='flex items-center gap-3'
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

              <Button
                variant='outline'
                className='hidden md:flex items-center gap-2 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-accent/10'
              >
                <Users className='w-4 h-4' />
                {'About Us'}
              </Button>
            </div>
          </div>
        </motion.header>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='container mx-auto px-4 py-10'
        >
          {/* Hero Section */}
          <div className='text-center max-w-4xl mx-auto mb-32'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6'
            >
              <Sparkles className='w-4 h-4 text-accent' />
              <span className='text-sm font-medium'>
                {"We're hiring exceptional talent"}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='text-5xl md:text-7xl font-bold mb-6 tracking-tight text-balance'
            >
              {'Join our team of'}
              <span className='block bg-gradient-to-r from-accent via-purple-400 to-accent bg-clip-text text-transparent'>
                {'Evolvo'}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='text-xl text-muted-foreground leading-relaxed text-balance'
            >
              {
                'Build the future with us. Choose your path and start your application journey today.'
              }
            </motion.p>
          </div>

          {/* Role Cards */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl my-6 mx-auto'>
            {jobRoles.map((role, index) => {
              const Icon = role.icon
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Link href={`/careers/${role.id}`}>
                    <Card className='group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-500 cursor-pointer h-full'>
                      {/* Glassmorphism gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      {/* Animated border glow */}
                      <div className='absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                      <div className='relative p-8 flex flex-col gap-6 h-full'>
                        <div className='flex items-start justify-between'>
                          <div className='relative'>
                            <div className='absolute inset-0 bg-accent/20 blur-xl rounded-full group-hover:bg-accent/30 transition-all duration-500' />
                            <div className='relative bg-accent/10 p-4 rounded-2xl border border-accent/20 group-hover:border-accent/40 transition-all duration-500'>
                              <Icon className='w-8 h-8 text-accent' />
                            </div>
                          </div>

                          <motion.div
                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                            whileHover={{ x: 5 }}
                          >
                            <ArrowRight className='w-5 h-5 text-accent' />
                          </motion.div>
                        </div>

                        <div className='flex-1'>
                          <h3 className='text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300'>
                            {role.title}
                          </h3>

                          {/* Main Description */}
                          <p className='text-muted-foreground leading-relaxed text-sm mb-4'>
                            {role.longDesc}
                          </p>
                        </div>

                        <Button
                          className='w-full bg-accent/10 hover:bg-accent hover:text-accent-foreground border border-accent/20 group-hover:border-accent transition-all duration-300'
                          variant='outline'
                          asChild
                        >
                          <span>{'Apply Now'}</span>
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='text-center mt-20'
          >
            <p className='text-muted-foreground mb-4'>
              {'Questions about our positions?'}
            </p>
            <Button
              variant='outline'
              className='bg-card/50 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/50'
            >
              {'Contact Recruitment Team'}
            </Button>
          </motion.div>
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
                {'© 2026 Evolvo Company. All rights reserved.'}
              </p>
              <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                <button
                  type='button'
                  className='hover:text-foreground transition-colors'
                >
                  {'Privacy Policy'}
                </button>
                <button
                  type='button'
                  className='hover:text-foreground transition-colors'
                >
                  {'Terms of Service'}
                </button>
                <button
                  type='button'
                  className='hover:text-foreground transition-colors'
                >
                  {'Careers'}
                </button>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
