import SupportView from '@/views/support'
import { Metadata } from 'next'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Apoio Técnico Especializado com Atendimento Personalizado',
  description: 'Suporte Técnico Especializado',
  keywords: [
    'soluções de tecnologia',
    'suporte técnico',
    'suporte especializado',
    'suporte para migração de dados',
    'suporte para correção de falhas',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/suporte`,
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

export default async function SupportPage() {
  return <SupportView />
}
