import { CrispChatProvider } from '@/components/CrispChat/provider'
import Spinner from '@/components/Spinner'
import ToastProvider from '@/components/ToastProvider'
import TopBar from '@/components/TopBar'
import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/types'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import Providers from './providers'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  applicationName: 'Dedicado Digital',
  generator: 'Dedicado Digital',
  category: 'technology',
  title: 'Dedicado Digital',
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  keywords: [
    'Software de Serviço em Nuvem',
    'Software SaaS',
    'Tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
  ],
  alternates: {
    canonical: process.env.NEXTAUTH_URL!,
  },
  openGraph: {
    siteName: 'Blog :: Dedicado Digital',
    type: 'website',
    title: 'Blog :: Dedicado Digital',
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: '/500x500-logotipo5.png',
    locale: 'pt_BR',
  },
}

export default async function AppLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)

  const onDevelopment = process.env.NODE_ENV === 'development'

  return (
    <Providers>
      <html lang='en' suppressHydrationWarning>
        {!onDevelopment && <CrispChatProvider />}
        <body>
          {session && <TopBar session={session!} />}
          <Suspense fallback={<Spinner />}>{children}</Suspense>
          {!onDevelopment && <Analytics />}
          <ToastProvider />
        </body>
      </html>
    </Providers>
  )
}
