import ControlMenu from '@/components/ControlMenu'
import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo, Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'usuários na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const UserManagementPage = () => {
  return (
    <PageDisplay
      title="usuários na plataforma"
      subtitle="controle dedicado"
    >
      <div className="w-full">
        <Suspense>
          <ControlMenu />
        </Suspense>
      </div>
    </PageDisplay>
  )
}

export default memo(UserManagementPage)
