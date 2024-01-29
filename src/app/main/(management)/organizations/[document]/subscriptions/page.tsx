import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PageScreen from '@/components/page-screen'
import { actionGetSubscriptionByParam } from './actions'
import { SubscriptionType } from '../../../subscriptions/types'
import OrganizationSubscriptionListView from './views/OrganizationSubscriptionListView'

export default async function OrganizationSubscriptionPage({
  params,
}: {
  params: { document: string }
}) {
  const { document } = params
  const session = await getServerSession(nextAuthOptions)
  const subscriptions: SubscriptionType[] | any =
    await actionGetSubscriptionByParam(session!, document)

  return session ? (
    <PageScreen title="assinaturas da minha organização">
      <OrganizationSubscriptionListView data={subscriptions} />
    </PageScreen>
  ) : (
    redirect('/')
  )
}
