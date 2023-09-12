import { authOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Configurações CFC:: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ConfigDrivingPage() {
  const session = await getServerSession(authOptions)

  return session ? '' : redirect('/')
}
