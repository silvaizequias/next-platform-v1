import { getServerSession } from 'next-auth'
import ProfileScreen from './screen'
import { nextAuthOptions } from '@/libraries/next-auth'
import { actionGetUserById } from '../users/actions'
import { UserType } from '../users/types'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions)
  const profile: UserType = await actionGetUserById(session?.user?.id!)

  return session ? <ProfileScreen profile={profile} /> : redirect('/')
}
