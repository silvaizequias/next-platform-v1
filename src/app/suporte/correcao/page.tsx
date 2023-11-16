import { Metadata } from 'next'
import CorrectionSupportView from './views'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Suporte para Correção de Falhas',
  description:
    'A Dedicado oferece suporte especializado para clientes que necessitam de ações resolutivas para correção de falhas.',
  keywords: [
    'tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
    'suporte técnico',
    'suporte especializado',
    'suporte para correção de falhas',
    'suporte para prevenção de erros',
    'suporte especializado para remoção de malwares',
    'suporte para varredura de sites',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/suporte/correcao`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/suporte/correcao`),
    title: 'Suporte para Correção de Falhas',
    description:
      'A Dedicado oferece suporte especializado para clientes que necessitam de ações resolutivas para correção de falhas.',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function CorrectionSupportPage() {
  return <CorrectionSupportView />
}
