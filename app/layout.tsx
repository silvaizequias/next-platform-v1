import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import { ReactNode } from 'react'
import Providers from './providers'
import Footer from '@/components/footer'
import Nav from '@/components/nav'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Sua Melhor Plataforma de Serviços',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${comfortaa.variable} font-default`}
    >
      <body className="text-base text-slate-800 bg-slate-200">
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
