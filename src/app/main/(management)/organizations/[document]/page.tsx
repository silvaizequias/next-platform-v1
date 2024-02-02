import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import actionGetOrganizationByDocument from './actions'
import { OrganizationType } from '../types'
import { redirect } from 'next/navigation'
import PageScreen from '@/components/page-screen'
import Box from '@/components/box'
import MyOrganizationUserListView from './views/MyOrganizationUserListView'
import MyOrganizationDetailView from './views/MyOrganizationDetailView'
import { SubscriptionType } from '../../subscriptions/types'
import { actionGetSubscriptionByParam } from './subscriptions/actions'
import OrganizationSubscriptionListView from './subscriptions/views/OrganizationSubscriptionListView'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByDocument(document)
  return organization
    ? { title: `detalhes da organização ${organization?.name}` }
    : null
}

export default async function OrganizationOnlyPage({
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
  const subscriptions: SubscriptionType[] | any =
    await actionGetSubscriptionByParam(session!, document)


  return session
    ? organization && (
        <PageScreen title={organization?.name}>
          <Box>
            <div className="w-full">
              <MyOrganizationDetailView data={organization} />
            </div>
            <div className="w-full">
              <OrganizationSubscriptionListView data={subscriptions} />
            </div>
          </Box>
          <div className="py-4">
            <MyOrganizationUserListView data={organization?.users} />
          </div>
        </PageScreen>
      )
    : redirect('/')
}
