import { authOptions } from '@/libraries/next-auth'
import SolutionsControlView from '@/views/control/solutions/SolutionsControlView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Controle de Soluções :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function SolutionControlPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <SolutionsControlView metadata={metadata} session={session!} />
    </main>
  )
}
