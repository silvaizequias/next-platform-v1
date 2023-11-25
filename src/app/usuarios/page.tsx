import { authOptions } from '@/libraries/next-auth'
import UserView from '@/views/users'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function UserPage() {
  const session = await getServerSession(authOptions)

  return session ? <UserView session={session!} /> : redirect('/')
}
