import { authOptions } from '@/libraries/next-auth'
import ServiceView from '@/views/services'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Serviços Dedicado',
  description: 'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  keywords: [
    'soluções de tecnologia',
    'suporte técnico',
    'suporte especializado',
    'suporte para migração de dados',
    'suporte para correção de falhas',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/servicos`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/suporte`),
    title: 'Apoio Técnico Especializado com Atendimento Personalizado',
    description: 'Suporte Técnico Especializado',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function ServicePage() {
  const session = await getServerSession(authOptions)

  return <ServiceView session={session!} />
}
