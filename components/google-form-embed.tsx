// 'use client'

// import { Spinner } from '@/components/ui/spinner'
// import { motion } from 'framer-motion'
// import { useState } from 'react'

// interface GoogleFormEmbedProps {
//   url: string
// }

// export default function GoogleFormEmbed ({ url }: GoogleFormEmbedProps) {
//   const [isLoading, setIsLoading] = useState(true)

//   return (
//     <div className='relative w-full h-[800px] rounded-lg overflow-hidden'>
//       {isLoading && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className='absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg z-10'
//         >
//           <div className='text-center'>
//             <Spinner className='mx-auto mb-4 text-accent' />
//             <p className='text-muted-foreground'>
//               {'Loading application form...'}
//             </p>
//           </div>
//         </motion.div>
//       )}

//       <iframe
//         src={url}
//         width='100%'
//         height='100%'
//         frameBorder='0'
//         marginHeight={0}
//         marginWidth={0}
//         title='Google Form'
//         onLoad={() => setIsLoading(false)}
//         className='w-full h-full bg-white rounded-lg'
//       >
//         {'Loading...'}
//       </iframe>
//     </div>
//   )
// }
// components/google-form-embed.tsx - FINAL VERSION
// components/google-form-embed.tsx - FINAL FIXED VERSION
// components/google-form-embed.tsx - FINAL FIXED VERSION
// components/google-form-embed.tsx - FINAL VERSION
'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircle, CheckCircle, ExternalLink, FileText } from 'lucide-react'
import { useState } from 'react'

interface GoogleFormEmbedProps {
  url: string
  jobTitle: string
  description?: string
}

export default function GoogleFormEmbed ({
  url,
  jobTitle,
  description
}: GoogleFormEmbedProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)

  const handleOpenForm = () => {
    setIsOpening(true)

    const newTab = window.open('', '_blank')

    if (newTab) {
      newTab.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Loading Application Form - ${jobTitle}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .container {
              text-align: center;
              color: white;
              padding: 2rem;
            }
            .spinner {
              border: 4px solid rgba(255,255,255,0.3);
              border-radius: 50%;
              border-top: 4px solid white;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h2>Opening Application Form</h2>
            <p>${jobTitle}</p>
            <p style="font-size: 14px; opacity: 0.8;">Redirecting to Google Forms...</p>
          </div>
          <script>
            setTimeout(() => {
              window.location.href = "${url}";
            }, 1000);
          </script>
        </body>
        </html>
      `)

      setTimeout(() => {
        setIsOpening(false)
        setHasOpened(true)
        setShowInstructions(false)
      }, 1500)
    } else {
      setIsOpening(false)
      window.location.href = url
    }
  }

  return (
    <div className='w-full space-y-4'>
      <Card className='p-6 border-2 border-border/50 bg-card/50 backdrop-blur-sm'>
        <div className='text-center mb-6'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4'>
            <FileText className='w-8 h-8 text-accent' />
          </div>
          <h3 className='text-xl font-semibold mb-2'>Application Form</h3>
          <p className='text-muted-foreground'>
            Position:{' '}
            <span className='font-medium text-foreground'>{jobTitle}</span>
          </p>
          {description && (
            <div className='mt-4 p-4 bg-muted/20 rounded-lg text-left'>
              <h4 className='font-semibold mb-2'>Job Description:</h4>
              <pre className='text-gray-300 leading-relaxed whitespace-pre-wrap text-sm'>
                {description}
              </pre>
            </div>
          )}
        </div>

        <div className='space-y-4'>
          <Button
            onClick={handleOpenForm}
            disabled={isOpening}
            size='lg'
            className='w-full gap-2 h-12 text-base'
          >
            {isOpening ? (
              <>
                <Spinner className='w-5 h-5' />
                Opening Form...
              </>
            ) : (
              <>
                <ExternalLink className='w-5 h-5' />
                Open Application Form
              </>
            )}
          </Button>

          {hasOpened && (
            <div className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3 animate-in fade-in duration-500'>
              <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0' />
              <div className='text-left'>
                <p className='font-medium text-green-800 dark:text-green-300'>
                  Form opened in new tab!
                </p>
                <p className='text-sm text-green-700 dark:text-green-400 mt-1'>
                  Complete the form in the new tab. You can return here when
                  done.
                </p>
              </div>
            </div>
          )}

          {showInstructions && (
            <div className='p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
              <div className='flex items-start gap-3'>
                <AlertCircle className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0' />
                <div className='text-left'>
                  <p className='font-medium text-blue-800 dark:text-blue-300 mb-1'>
                    How to Apply:
                  </p>
                  <ol className='text-sm text-blue-700 dark:text-blue-400 space-y-1 list-decimal pl-4'>
                    <li>Click the button above to open the form</li>
                    <li>Complete all required fields</li>
                    <li>Submit the form when finished</li>
                    <li>Return to this tab after submission</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Direct Link Fallback */}
      {/* <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          Or copy this link:{' '}
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-accent hover:underline break-all'
          >
            {url}
          </a>
        </p>
      </div> */}
    </div>
  )
}
