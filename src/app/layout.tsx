import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import TopBar from '@/components/topbar'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '400', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-lunar-50 text-lunar-800 dark:bg-lunar-900 dark:text-lunar-100">
        <TopBar />
        {children}
      </body>
    </html>
  )
}
