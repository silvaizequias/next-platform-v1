import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo } from 'react'
import OrderSearch from './components/OrderSearch'

export const metadata: Metadata = {
  title: {
    default: 'verificar status de pedido',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const OneOrderPage = () => {
  return (
    <PageDisplay
      title={`verificar status de pedido`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full h-80 flex flex-col justify-center items-center gap-6">
        <div className="w-full max-w-lg">
          <h4 className="text-center text-lg dark:text-sky-400">
            informe o código do pedido para acompanhar o andamento e saber
            maiores detalhes
          </h4>
        </div>
        <div className="mx-auto">
          <OrderSearch />
        </div>
      </div>
    </PageDisplay>
  )
}
export default memo(OneOrderPage)
