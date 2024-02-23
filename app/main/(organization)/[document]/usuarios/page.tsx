import PageDisplay from '@/components/PageDisplay'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationType } from '@/types/organization'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import UserDetailView from './views/UserDetailView'

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
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType | any = null

  return (
    <PageDisplay
      title={`usuários da organização ${organization?.name}`}
      subtitle="sua melhor plataforma de serviços"
    >
      <UserDetailView data={organization} session={session!} />
    </PageDisplay>
  )
}
