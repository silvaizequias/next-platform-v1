import { authOptions } from '@/libraries/next-auth'
import UserView from '@/views/users'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Usuários do Sistema',
}

export default async function UserPage() {
  const session = await getServerSession(authOptions)

  return session ? <UserView /> : redirect('/')
}
