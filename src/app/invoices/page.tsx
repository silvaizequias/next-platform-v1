import { authOptions } from '@/libraries/next-auth'
import InvoicesView from '@/views/invoices/InvoicesView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gestão de Faturas :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function InvoiceManagementPage() {
  const session = await getServerSession(authOptions)
  const { user }: any = session?.user

  return session && user?.role == 'MASTER' ? (
    <main>
      <InvoicesView session={session} />
    </main>
  ) : (
    redirect('/')
  )
}
