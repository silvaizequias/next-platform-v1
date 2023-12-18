import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Providers } from './providers'
import { Comfortaa, Poppins } from 'next/font/google'

export const poppins = Poppins({
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '400', '500'],
})

export const comfortaa = Comfortaa({
  display: 'swap',
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Suporte e Desenvolvimento Dedicado',
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  icons: './favicon.ico',
  openGraph: {
    title: 'Suporte e Desenvolvimento Dedicado',
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: ['/logotipo.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${comfortaa.variable} font-default`}>
      <body className="min-h-screen bg-slate-200 text-zinc-600 dark:bg-slate-800 dark:text-zinc-200 text-base font-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
