import UserView from '@/views/users'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Usuários do Sistema',
}

export default function UserPage() {
  const session: boolean = false

  return session ? <UserView /> : redirect('/')
}
