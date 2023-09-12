import { authOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Painel de Serviço de Campo :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function FieldServicePage() {
  const session = await getServerSession(authOptions)

  return session ? '' : redirect('/')
}
