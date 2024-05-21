import ControlMenu from '@/components/ControlMenu'
import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo, Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'você está no controle da melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const MainManagementPage = async () => {
  return (
    <PageDisplay
      title="controle dedicado"
      subtitle="a melhor plataforma de serviços"
    >
      <div className="w-full">
        <Suspense>
          <ControlMenu />
        </Suspense>
      </div>
    </PageDisplay>
  )
}

export default memo(MainManagementPage)
