import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import Providers from './providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/layouts/types'
import DefaultLayout from '@/layouts'
import { Inter, Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500'],
  variable: '--font-roboto',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500'],
  variable: '--font-inter',
})

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
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
    canonical: NEXTAUTH_URL,
  },
  openGraph: {
    url: new URL(NEXTAUTH_URL),
    siteName: 'Dedicado Digital',
    type: 'website',
    title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: '/500x500-logotipo5.png',
    locale: 'pt_BR',
  },
}

export default async function RootLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)
  const onDevelopment = process.env.NODE_ENV === 'development'

  return (
    <html
      lang='pt-BR'
      className={`${roboto.variable} ${inter.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        <link
          href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
          rel='stylesheet'
        />
      </head>
      <body>
        <Providers>
          <DefaultLayout session={session!}>{children}</DefaultLayout>
          {!onDevelopment && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}
