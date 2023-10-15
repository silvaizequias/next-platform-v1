import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import Providers from './providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Dedicado Digital',
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={`${roboto.variable} ${roboto.variable} font-sans`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
