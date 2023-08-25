import { authOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gestão de Serviços :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ServiceManagementPage() {
  const session = await getServerSession(authOptions)
  const { user }: any = session?.user

  return session && user?.role == 'MASTER' ? <main>...</main> : redirect('/')
}
