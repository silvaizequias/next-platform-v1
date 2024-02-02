import { Metadata } from 'next'
import { actionGetMyOrganizations } from './actions'
import LandingPageView from './views/LandingPageView'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import MainPageView from './views/MainPageView'

export const metadata: Metadata = {
  title: {
    default: 'a melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MainPage() {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id!
  const myOrganizations = await actionGetMyOrganizations(userId)

  return session ? <MainPageView /> : <LandingPageView />
}
