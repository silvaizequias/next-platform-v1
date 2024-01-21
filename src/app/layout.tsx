import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Providers } from './providers'
import { Comfortaa, Poppins } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '400', '500'],
})

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600'],
})

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const metadata: Metadata = {
  applicationName: 'dedicado',
  generator: 'dedicado',
  category: 'website',
  title: {
    default: 'sua melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  icons: './favicon.ico',
  keywords: [
    'software de serviços em nuvem',
    'software saas',
    'tecnologia da informação',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
    'serviços de tecnologia',
    'plataforma de serviços',
  ],
  openGraph: {
    title: {
      default: 'sua melhor plataforma de serviços',
      template: `%s | dedicado`,
    },
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: ['/logotipo.png'],
  },
  metadataBase: new URL(`https://www.${NEXT_PUBLIC_URL}`),
  alternates: {
    canonical: new URL(`https://www.${NEXT_PUBLIC_URL}`),
  },
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${comfortaa.variable} font-default`}
    >
      <body className="min-h-screen text-base font-light">
        <Providers>{children}</Providers>
        <Toaster
          position={'top-center'}
          toastOptions={{ className: 'react-hot-toast' }}
        />
      </body>
    </html>
  )
}
