import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import React from 'react'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: "Join Evolvo - We're Hiring Top Tech Talent",
  description:
    'Join our team of exceptional developers and experts. Apply for Meta Expert, PHP Developer, or Full Stack Developer positions at Evolvo Company.',
  keywords: [
    'careers',
    'jobs',
    'hiring',
    'developers',
    'meta expert',
    'php developer',
    'full stack developer',
    'evolvo'
  ],
  openGraph: {
    title: "Join Evolvo - We're Hiring Top Tech Talent",
    description:
      'Join our team of exceptional developers and experts. Apply now.',
    type: 'website'
  },
  generator: 'mubaidjavaid',
  icons: {
    icon: [
      {
        url: '/evolvo.png',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/evolvo.png',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/evolvo.png',
        type: 'image/svg+xml'
      }
    ],
    apple: '/evolvo.png'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes'
        />

        {/* Facebook Pixel Script */}
        <Script
          id='fb-pixel'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1484967379653969');
              fbq('track', 'PageView');
            `
          }}
        />

        {/* Noscript fallback */}
        <noscript>
          <img
            height='1'
            width='1'
            style={{ display: 'none' }}
            src='https://www.facebook.com/tr?id=1484967379653969&ev=PageView&noscript=1'
            alt=''
          />
        </noscript>
      </head>

      <body className={`font-sans antialiased ${geistSans.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
