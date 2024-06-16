import type { Metadata } from 'next'
import { Comfortaa, Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import Providers from './providers'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600', '700'],
  style: 'normal',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: 'normal',
})

export const metadata: Metadata = {
  title: {
    default: 'Sua Melhor Plataforma de Serviços',
    template: `%s | dedicado`,
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
      <body>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
