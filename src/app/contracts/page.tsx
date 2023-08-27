import { authOptions } from '@/libraries/next-auth'
import ContractsView from '@/views/contracts/ContractsView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gestão de Contratos :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ContractManagementPage() {
  const session = await getServerSession(authOptions)
  const { user }: any = session?.user

  return session && user?.role == 'MASTER' ? (
    <main>
      <ContractsView session={session} />
    </main>
  ) : (
    redirect('/')
  )
}
