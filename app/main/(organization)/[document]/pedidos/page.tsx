import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrderType } from '@/types/order'
import { OrganizationType } from '@/types/organization'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetOrdersByOrganization } from './actions'
import OrderListView from './views/OrderListView'
import { actionGetOrganizationByDocument } from '../actions'

export const metadata: Metadata = {
  title: {
    default: 'pedidos da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrderPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType | any =
    await actionGetOrganizationByDocument(document)
  const orders: OrderType[] | any = await actionGetOrdersByOrganization(document)

  return (
    <PageDisplay
      title={`pedidos da organização ${organization?.name}`}
      subtitle="sua melhor plataforma de serviços"
    >
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex flex-col w-full space-y-2"></div>
        <div className="flex flex-col w-full space-y-2">
          <OrderListView data={orders} />
        </div>
      </div>
    </PageDisplay>
  )
}
