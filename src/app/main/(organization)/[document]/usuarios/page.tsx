import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'usuários da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrganizationUsersPage({
  params,
}: {
  params: { document: string }
}) {
  const { document } = params

  return (
    <PageDisplay title={document}>
      <div>{document}</div>
    </PageDisplay>
  )
}
