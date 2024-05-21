import PageDisplay from '@/components/PageDisplay'
import PlatformMenu from '@/components/PlatformMenu'
import { Metadata } from 'next'
import { memo, Suspense } from 'react'
import MyOrdersView from './views/MyOrdersView'

export const metadata: Metadata = {
  title: {
    default: 'meus pedidos na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const MyOrdersPage = () => {
  return (
    <PageDisplay
      title={`meus pedidos`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full">
        <Suspense>
          <PlatformMenu />
          <MyOrdersView />
        </Suspense>
      </div>
    </PageDisplay>
  )
}
export default memo(MyOrdersPage)
