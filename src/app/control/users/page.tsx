import { authOptions } from '@/libraries/next-auth'
import UsersControlView from '@/views/control/users/UsersControlView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Controle de Usuários :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function UserControlPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <UsersControlView metadata={metadata} session={session!} />
    </main>
  )
}
