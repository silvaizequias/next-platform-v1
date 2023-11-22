import { Metadata } from 'next'
import LandingView from '@/views/landing'
import AccountView from '@/views/account'
import { Fragment } from 'react'
import SupportView from '@/views/support'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Sistemas Personalizados de Alta Performance',
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  keywords: [
    'software de serviço em nuvem',
    'software saas',
    'tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
    'suporte técnico',
    'suporte especializado',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}`),
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
  },
}

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  return !session ? (
    <Fragment>
      <LandingView />
      <SupportView />
    </Fragment>
  ) : (
    <AccountView session={session} />
  )
}
