import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo, Suspense } from 'react'
import OneOrderDetailView from './views/OneOrderDetailView'

export async function generateMetadata({
  params,
}: {
  params: { code: string }
}): Promise<Metadata | null> {
  const { code } = params

  return {
    title: {
      default: `detalhes do pedido ${code || ''}`,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

const OneOrderDetailPage = ({ params }: { params: { code: string } }) => {
  const { code } = params

  return (
    <PageDisplay
      title={`detailhes do pedido ${code}`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full">
        <Suspense>
          <OneOrderDetailView />
        </Suspense>
      </div>
    </PageDisplay>
  )
}
export default memo(OneOrderDetailPage)
