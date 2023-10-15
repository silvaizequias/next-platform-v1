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

const BASE_URL = 'https://dedicado.digital'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: 'Dedicado Digital',
  generator: 'Dedicado Digital',
  category: 'technology',
  title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  keywords: [
    'Software de Serviço em Nuvem',
    'Software SaaS',
    'Tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
  ],
  icons: { icon: '/favicon.ico' },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    url: new URL(BASE_URL),
    siteName: 'Dedicado Digital',
    type: 'website',
    title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: '/500x500-logotipo5.png',
    locale: 'pt_BR',
  },
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
