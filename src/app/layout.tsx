import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { Providers } from './providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Dedicado',
  description: 'Suporte e Desenvolvimento',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} font-sans`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
