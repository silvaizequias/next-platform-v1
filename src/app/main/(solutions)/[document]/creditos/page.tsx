import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetOrganizationByDocument } from '../actions'
import MyOrganizationSubscriptionsListView from './views/MyOrganizationSubscriptionsListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'créditos da minha organização na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrganizationSubscriptionsPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType = await actionGetOrganizationByDocument(
    document,
    session!,
  )

  return (
    <PageDisplay
      title={`créditos da organização ${organization?.name}`}
      subtitle="sua melhor plataforma de serviços"
    >
      <MyOrganizationSubscriptionsListView
        subscriptions={organization?.subscriptions}
      />
    </PageDisplay>
  )
}
