import { authOptions } from '@/libraries/next-auth'
import UsersView from '@/views/control/users/UsersView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Gestão de Usuários :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function UserManagementPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <UsersView metadata={metadata} session={session!} />
    </main>
  )
}
