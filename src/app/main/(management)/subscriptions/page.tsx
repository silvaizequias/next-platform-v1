import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { SubscriptionType } from './types'
import { actionGetSubscriptions } from './actions'
import SubscriptionsListView from './views/SubscriptionsListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'gestão de assinaturas da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function SubscriptionsManagementPage() {
  const session = await getServerSession(nextAuthOptions)
  const subscriptions: SubscriptionType[] = await actionGetSubscriptions(
    session!,
  )

  return session && session?.user?.profile == 'master' ? (
    <PageDisplay
      title="gestão de assinaturas da plataforma"
      subtitle="sua melhor plataforma de serviços"
    >
      <SubscriptionsListView subscriptions={subscriptions} />
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
