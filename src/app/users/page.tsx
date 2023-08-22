import { authOptions } from '@/libraries/next-auth'
import UsersPage from '@/views/users/UsersPage'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Usuários do Sistema :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ManagerUsers() {
  const session = await getServerSession(authOptions)
  const { user }: any = session?.user

  return session && user?.role == 'MASTER' ? (
    <UsersPage session={session} />
  ) : (
    redirect('/')
  )
}
