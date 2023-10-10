import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/layouts/types'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  applicationName: 'Dedicado Digital',
  generator: 'Dedicado Digital',
  category: 'technology',
  title: {
    default: 'Controle do Sistema Dedicado Digital',
    template: `%s | Dedicado Digital`,
  },
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
    canonical: `${NEXTAUTH_URL}/control`,
  },
  openGraph: {
    url: new URL(NEXTAUTH_URL),
    siteName: 'Dedicado Digital',
    type: 'website',
    title: {
      default: 'Controle do Sistema Dedicado Digital',
      template: `%s | Dedicado Digital`,
    },
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: '/500x500-logotipo5.png',
    locale: 'pt_BR',
  },
}

export default async function RootLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)

  return session && session?.user?.profile == 'MASTER' ? (
    <Suspense fallback={'...'}>{children}</Suspense>
  ) : (
    redirect('/')
  )
}
