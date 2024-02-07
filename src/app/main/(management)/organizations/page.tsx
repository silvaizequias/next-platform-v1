import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { OrganizationType } from './types'
import { actionGetOrganizations } from './actions'
import OrganizationListView from './views/OrganizationsListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'gestão de organizações da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrganizationsManagementPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizations: OrganizationType[] | any = await actionGetOrganizations(
    session!,
  )

  return session && session?.user?.profile == 'master' ? (
    <PageDisplay
      title="gestão de organizações da plataforma"
      subtitle="sua melhor plataforma de serviços"
    >
      <OrganizationListView organizations={organizations} />
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
