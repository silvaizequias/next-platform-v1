import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Providers from './providers'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '400', '600'],
  variable: '--font-inter',
})

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    siteName: 'Dedicado Digital',
    type: 'website',
    title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <html lang="en" className={`s ${inter.variable}`}>
      <body className="min-h-screen bg-horizon-50 text-horizon-800 dark:bg-lunar-900 dark:text-lunar-100">
        <Providers>
          {children}
          {!isDevelopment && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}
