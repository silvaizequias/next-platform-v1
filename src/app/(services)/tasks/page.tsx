import { authOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Painel de Tarefas',
}

export default async function TasksPage() {
  const session = await getServerSession(authOptions)

  return session ? '' : redirect('/')
}
