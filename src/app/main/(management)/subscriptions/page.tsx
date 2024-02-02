import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PageScreen from '@/components/page-screen'
import { actionGetSubscriptions } from './actions'
import SubscriptionListView from './views/SubscriptionListView'

export default async function SubscriptionPage() {
  const session = await getServerSession(nextAuthOptions)
  const subscriptions = await actionGetSubscriptions(session!)

  return session && session?.user?.profile == 'master' ? (
    <PageScreen title="assinaturas da plataforma">
      <SubscriptionListView data={subscriptions} />
    </PageScreen>
  ) : (
    redirect('/')
  )
}
