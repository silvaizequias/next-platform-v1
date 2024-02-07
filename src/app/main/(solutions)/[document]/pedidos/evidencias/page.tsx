import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetOrganizationByDocument } from '../../actions'
import { OrderType } from '@/app/main/(management)/orders/types'
import { actionGetMyOrganziationOrders } from '../actions'
import MyOrganziationOrderAttachmentsListView from './views/MyOrganziationOrderAttachmentsListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'evidências de pedidos da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrderAttachmentsPage({
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
      title={`evidências de pedidos da organização ${organization?.name}`}
      subtitle="sua melhor plataforma de serviços"
    >
      <MyOrganziationOrderAttachmentsListView orders={orders} />
    </PageDisplay>
  )
}
