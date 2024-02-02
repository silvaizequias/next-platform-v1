import actionGetOrganizationByDocument from '@/app/main/(management)/organizations/[document]/actions'
import PageScreen from '@/components/page-screen'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { OrderType } from './types'
import OrderListView from './views/OrderListView'
import { actionGetOrdersByOrganization } from './actions'

export default async function OrganizationOrderPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByDocument(document, session!)

  const orders: OrderType[] | any = await actionGetOrdersByOrganization(
    organization?.document,
    organization?.apiKey?.authorizationKey,
  )

  return (
    <PageScreen title={`gestão de pedidos da ${organization?.name}`}>
      {organization && (
        <div className="w-full">
          <OrderListView data={orders} organization={organization} />
        </div>
      )}
    </PageScreen>
  )
}
