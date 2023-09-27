import { LayoutProps } from '@/types'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Providers from './providers'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '200',
})
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '100',
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
      suppressHydrationWarning
      className={`${inter.variable} ${roboto.variable} mx-auto`}
    >
      <Providers>
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={'...'}>{children}</Suspense>
            <Toaster />
            {!onDevelopment && <Analytics />}
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  )
}
