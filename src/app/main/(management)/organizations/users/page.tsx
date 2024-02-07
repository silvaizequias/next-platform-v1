import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { actionGetOrganizationUsers } from './actions'
import { OrganizationUsersType } from './types'
import OrganizationUsersListView from './views/OrganizationUsersListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'gestão de usuários nas organizações da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrganizationUsersManagementPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizationUsers: OrganizationUsersType[] | any =
    await actionGetOrganizationUsers(session!)

  return session ? (
    <PageDisplay
      title="gestão de usuários nas organizações da plataforma"
      subtitle="sua melhor plataforma de serviços"
    >
      <OrganizationUsersListView organizationUsers={organizationUsers} />
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
