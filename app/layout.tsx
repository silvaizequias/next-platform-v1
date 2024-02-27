import './globals.css'
import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import { ReactNode } from 'react'
import Providers from './providers'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'sua melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${comfortaa.variable} font-default`}
    >
      <body className="text-base text-sky-800 bg-slate-200 dark:bg-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
