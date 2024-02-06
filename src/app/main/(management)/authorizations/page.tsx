import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { actionGetOrganizationKeys } from './actions'
import { OrganizationKeyType } from './types'
import AuthorizationsListView from './views/AuthorizationsListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'gestão de chaves de autorização das organizações da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function AuthorizationsManagementPage() {
  const session = await getServerSession(nextAuthOptions)
  const authorizations: OrganizationKeyType[] | any =
    await actionGetOrganizationKeys(session!)

  return session ? (
    <PageDisplay
      title="gestão de chaves de autorização das organizações da plataforma"
      subtitle="sua melhor plataforma de serviços"
    >
      <AuthorizationsListView authorizations={authorizations} />
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
