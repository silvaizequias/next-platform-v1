import { LayoutProps } from '@/types'
import { Metadata } from 'next'
import { Suspense } from 'react'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  applicationName: 'Dedicado Digital',
  generator: 'Dedicado Digital',
  category: 'technology',
  title: { default: 'Gestão de Serviços', template: `%s | Dedicado Digital` },
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
    canonical: `${NEXTAUTH_URL}/gestao-de-servicos`,
  },
  openGraph: {
    url: new URL(NEXTAUTH_URL),
    siteName: 'Dedicado Digital',
    type: 'website',
    title: { default: 'Gestão de Serviços', template: `%s | Dedicado Digital` },
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: '/500x500-logotipo5.png',
    locale: 'pt_BR',
  },
}

export default async function FieldServiceLayout(props: LayoutProps) {
  const { children } = props

  return <Suspense fallback={'...'}>{children}</Suspense>
}
