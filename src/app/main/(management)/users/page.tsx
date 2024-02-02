import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PageScreen from '@/components/page-screen'
import { actionGetUsers } from './actions'
import { UserType } from './types'
import UserListView from './views/UserListView'

export default async function UserPage() {
  const session = await getServerSession(nextAuthOptions)
  const users: UserType[] = await actionGetUsers(session!)

  return session && session?.user?.profile == 'master' ? (
    <PageScreen title="usuários da plataforma">
      <UserListView data={users} />
    </PageScreen>
  ) : (
    redirect('/')
  )
}
