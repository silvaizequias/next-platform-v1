import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import ProfileScreen from './screen'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions)

  return session ? <ProfileScreen /> : redirect('/')
}
