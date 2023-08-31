import { authOptions } from '@/libraries/next-auth'
import UsersView from '@/views/users/UsersView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gestão de Usuários :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function UserManagementPage() {
  const session = await getServerSession(authOptions)

  return session ? (
    <main>
      <UsersView session={session!} />
    </main>
  ) : (
    redirect('/')
  )
}
