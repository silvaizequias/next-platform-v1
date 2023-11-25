import { authOptions } from '@/libraries/next-auth'
import ProfileView from '@/views/profile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return session ? <ProfileView session={session} /> : redirect('/')
}
