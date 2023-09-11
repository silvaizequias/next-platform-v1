import { authOptions } from '@/libraries/next-auth'
import ServicesView from '@/views/control/services/ServicesView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Gestão de Serviços :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ServiceManagementPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <ServicesView metadata={metadata} session={session!} />
    </main>
  )
}
