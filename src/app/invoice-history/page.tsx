import { authOptions } from '@/libraries/next-auth'
import InvoiceHistoryView from '@/views/invoice-history/InvoiceHistoryView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Histórico de Faturas :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function InvoiceHistoryPage() {
  const session = await getServerSession(authOptions)
  const { user }: any = session?.user

  return session ? (
    <main>
      <InvoiceHistoryView session={session!} />
    </main>
  ) : (
    redirect('/')
  )
}
