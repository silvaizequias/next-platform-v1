import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '400', '600'],
  variable: '--font-inter',
})

const BASE_URL = process.env.BASE_URL!

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-lunar-50 text-lunar-800 dark:bg-lunar-900 dark:text-lunar-100">
        {children}
      </body>
    </html>
  )
}
