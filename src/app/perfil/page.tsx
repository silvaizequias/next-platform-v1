import { authOptions } from '@/libraries/next-auth'
import ProfileView from '@/views/profile'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Meu Perfil',
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return session ? <ProfileView session={session} /> : redirect('/')
}
