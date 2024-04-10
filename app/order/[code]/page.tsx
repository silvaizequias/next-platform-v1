import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo } from 'react'

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

const OneOrderDetailPage = async ({ params }: { params: { code: string } }) => {
  const { code } = params
  const logotipo = '/logotipo.svg'

  return (
    <PageDisplay
      title={`detailhes do pedido ${code}`}
      subtitle={`a melhor plataforma de serviços`}
    >
      <div className="w-full"></div>
    </PageDisplay>
  )
}

export default memo(OneOrderDetailPage)
