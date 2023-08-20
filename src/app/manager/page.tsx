import ManagerPage from '@/pages/manager/ManagerPage'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Gerenciamento :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Manager() {
  const session = await getServerSession()

  return <ManagerPage session={session!} />
}
