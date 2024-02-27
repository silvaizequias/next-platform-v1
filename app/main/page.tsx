import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationUserType } from '@/types/organization-user'
import { getServerSession } from 'next-auth'
import OrganizationListView from './(organization)/[document]/views/OrganizationListView'
import LandingPageView from './views/LandingPageView'
import {
  actionGetOrdersByMember,
  actionGetOrganizationUserByUserId,
} from './actions'
import Unauthorized from '@/components/Unauthorized'
import UserOrderListView from './(organization)/[document]/usuarios/views/UserOrderListView'
import { OrderType } from '@/types/order'

export default async function MainPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizations: OrganizationUserType[] | any =
    session && (await actionGetOrganizationUserByUserId())
  const orders: OrderType[] | any =
    session && (await actionGetOrdersByMember(session?.user?.phone!))

  return session ? (
    <PageDisplay title="dedicado" subtitle="sua melhor plataforma de servços">
      {organizations && organizations?.statusCode != 401 ? (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full space-2">
            <UserOrderListView data={orders} />
          </div>
          <div className="flex flex-col w-full space-2">
            <OrganizationListView data={organizations} />
          </div>
        </div>
      ) : (
        <Unauthorized message={`${organizations?.message}`} />
      )}
    </PageDisplay>
  ) : (
    <LandingPageView />
  )
}
