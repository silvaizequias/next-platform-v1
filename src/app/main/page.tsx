import { Metadata } from 'next'
import { actionGetMyOrganizations } from './actions'
import LandingPageView from './views/LandingPageView'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationUsersType } from './(management)/organizations/users/types'
import PageDisplay from '@/components/PageDisplay'
import MyOrganizationsMainListView from './views/MyOrganizationsMainListView'

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
  const myOrganizations: OrganizationUsersType[] =
    await actionGetMyOrganizations(session!)

  return session ? (
    <PageDisplay title="dedicado" subtitle="sua melhor plataforma de serviços">
      <MyOrganizationsMainListView data={myOrganizations} />
    </PageDisplay>
  ) : (
    <LandingPageView />
  )
}
