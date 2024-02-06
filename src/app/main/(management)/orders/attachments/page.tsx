import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    default: 'gestão de evidências de pedidos da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrderAttachmentsManagementPage() {
  const session = await getServerSession(nextAuthOptions)

  return session ? (
    <PageDisplay
      title="gestão de evidências de pedidos da plataforma"
      subtitle="sua melhor plataforma de serviços"
    >
      ...
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
