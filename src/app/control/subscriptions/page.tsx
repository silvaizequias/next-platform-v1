import { authOptions } from '@/libraries/next-auth'
import SubscriptionsControlView from '@/views/control/subscriptions/SubscriptionsControlView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Controle de Contratações :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function SubscriptionControlPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <SubscriptionsControlView metadata={metadata} session={session!} />
    </main>
  )
}
