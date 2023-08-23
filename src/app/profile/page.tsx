import { authOptions } from '@/libraries/next-auth'
import ProfileView from '@/views/profile/ProfileView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Perfil :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return session ? (
    <main>
      <ProfileView session={session!} />
    </main>
  ) : (
    redirect('/')
  )
}
