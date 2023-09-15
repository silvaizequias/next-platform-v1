import { authOptions } from '@/libraries/next-auth'
import ControlView from '@/views/control/ControlView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Painel de Controle :: Dedicado Digital',
}

export default async function ControlPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <ControlView metadata={metadata} session={session!} />
    </main>
  )
}
