import { authOptions } from '@/libraries/next-auth'
import ProfilePage from '@/views/profile/ProfilePage'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Perfil :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return session ? <ProfilePage session={session!} /> : redirect('/')
}
