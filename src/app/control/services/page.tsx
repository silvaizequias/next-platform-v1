import { authOptions } from '@/libraries/next-auth'
import ServicesControlView from '@/views/control/services/ServicesControlView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Controle de Serviços :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ServiceControlPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <ServicesControlView metadata={metadata} session={session!} />
    </main>
  )
}
