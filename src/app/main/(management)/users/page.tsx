import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import UserScreen from './screen'
import { redirect } from 'next/navigation'

export default async function UserPage() {
  const session = await getServerSession(nextAuthOptions)

  return session ? <UserScreen /> : redirect('/')
}
