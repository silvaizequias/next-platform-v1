import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dedicado Digital',
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const onDevelopment = process.env.NODE_ENV === 'development'

  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        {!onDevelopment && <Analytics />}
      </body>
    </html>
  )
}
