import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'conteúdo inteligente do mundo da tecnologia',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function BlogPage() {
  return (
    <PageDisplay
      title="blog dedicado"
      subtitle="conteúdo inteligente do universo da tecnologia"
    >
      ...
    </PageDisplay>
  )
}
