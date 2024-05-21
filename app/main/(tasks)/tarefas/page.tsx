import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo, Suspense } from 'react'
import MyTasksView from './views/MyTasksView'
import PlatformMenu from '@/components/PlatformMenu'

export const metadata: Metadata = {
  title: {
    default: 'tarefas pessoais',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const OneOrderPage = () => {
  return (
    <PageDisplay
      title={`minhas tarefas pessoais`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full">
        <Suspense>
          <PlatformMenu />
          <MyTasksView />
        </Suspense>
      </div>
    </PageDisplay>
  )
}
export default memo(OneOrderPage)
