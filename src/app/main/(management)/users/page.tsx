import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { UserType } from './types'
import { actionGetUsers } from './actions'
import UsersListView from './views/UsersListView'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'gestão de usuários na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function UsersPage() {
  const session = await getServerSession(nextAuthOptions)
  const users: UserType[] = await actionGetUsers(session!)

  return session && session?.user?.profile == 'master' ? (
    <PageDisplay
      title="gestão de usuários na plataforma"
      subtitle="sua melhor plataforma de serviços"
    >
      <UsersListView users={users} />
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
