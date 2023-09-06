import { authOptions } from '@/libraries/next-auth'
import SubscriptionsView from '@/views/subscriptions/SubscriptionsView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gestão de Contratações :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function SubscriptionManagementPage() {
  const session = await getServerSession(authOptions)

  return session && session?.user?.role == 'MASTER' ? (
    <main>
      <SubscriptionsView session={session!} />
    </main>
  ) : (
    redirect('/')
  )
}
