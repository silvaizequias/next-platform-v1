import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetOrganizationByDocument } from '../../actions'
import MyOrganziationOrderItemsListView from './views/MyOrganziationOrderItemsListView'
import { OrderType } from '@/app/main/(management)/orders/types'
import { actionGetMyOrganziationOrders } from '../actions'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'itens de pedidos da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrderItemsPage({
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
  const orders: OrderType[] | any = await actionGetMyOrganziationOrders(
    organization?.authorizationKey?.authorizationKey,
    organization?.document,
  )

  return (
    <PageDisplay
      title={`itens de pedidos da organização ${organization?.name}`}
      subtitle="sua melhor plataforma de serviços"
    >
      <MyOrganziationOrderItemsListView
        orders={orders}
        authorizationKey={organization?.authorizationKey?.authorizationKey}
      />
    </PageDisplay>
  )
}
