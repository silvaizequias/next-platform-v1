import { Metadata } from 'next'
import TermsOfServiceView from './views'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Termos de Serviço',
  description:
    'Terms de consentimento para contratação e utilização das soluções personalizadas de sistemas e serviços da Dedicado!',
  keywords: [
    'termos de servico de utilização',
    'termos de serviços de suporte',
    'termoss de serviços da dedicado',
    'termos e políticas de serviços',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/termos-de-servico`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/termos-de-servico`),
    title: 'Termos de Serviço',
    description:
      'Terms de consentimento para contratação e utilização das soluções personalizadas de sistemas e serviços da Dedicado!',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function TermsOfServicePage() {
  return <TermsOfServiceView />
}
