import { authOptions } from '@/libraries/next-auth'
import ProfileView from '@/views/profile'
import { getServerSession } from 'next-auth'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return <ProfileView />
}
