import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import Providers from './providers'
import TopBar from '@/components/top-bar'

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
    images: '/img/logotipo5.png',
    locale: 'pt_BR',
  },
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={`dark ${roboto.variable} ${roboto.variable} font-sans`}
    >
      <body>
        <Providers>
          <main className='relative min-h-screen dark:bg-blue-gray-900 bg-blue-gray-50 text-blue-gray-900 dark:text-blue-gray-50'>
            <TopBar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
