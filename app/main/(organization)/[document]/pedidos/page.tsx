'use client'

import PageDisplay from '@/components/PageDisplay'
import { Suspense } from 'react'
import OrganizationMenu from '../components/OrganizationMenu'
import OrderTabsView from './views/OrderTabsView'
import { useOrganization } from '@/contexts/OrganizationContext'

const OrderPage = () => {
  const { organization }: any = useOrganization()

  return (
    <PageDisplay
      title={`pedidos da organização ${organization?.name ?? ''}`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <Suspense>
        <OrganizationMenu />
        <OrderTabsView />
      </Suspense>
    </PageDisplay>
  )
}
export default OrderPage
