import { Metadata } from 'next'
import LandingView from './views'

const BASE_URL = process.env.BASE_URL!

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Sistema Personalizado de Alta Performance',
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
    canonical: BASE_URL,
  },
  openGraph: {
    url: new URL(BASE_URL),
    title: 'Sistema Personalizado de Alta Performance',
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  }
}

export default async function LandingPage() {
  return <LandingView />
}
