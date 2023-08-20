import ProfilePage from '@/pages/profile/ProfilePage'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Perfil :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Profile() {
  const session = await getServerSession()

  return <ProfilePage session={session!} />
}
