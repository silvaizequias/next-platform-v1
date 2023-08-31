import { authOptions } from '@/libraries/next-auth'
import ServicesView from '@/views/services/ServicesView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gestão de Serviços :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ServiceManagementPage() {
  const session = await getServerSession(authOptions)

  return session ? (
    <main>
      <ServicesView session={session!} />
    </main>
  ) : (
    redirect('/')
  )
}
