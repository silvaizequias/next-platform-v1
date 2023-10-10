import { authOptions } from '@/libraries/next-auth'
import ServiceManagementPrivateView from '@/views/solutions/service-management'
import ServiceManagementPublicView from '@/views/solutions/service-management/ServiceManagementPublicView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Acompanhamento em tempo real de demandas em campo',
}
export default async function ServiceManagementPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      {!session || session.user.profile == 'GUEST' ? (
        <ServiceManagementPublicView />
      ) : (
        <ServiceManagementPrivateView session={session!} />
      )}
    </main>
  )
}
