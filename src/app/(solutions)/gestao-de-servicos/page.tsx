import { authOptions } from '@/libraries/next-auth'
import ServiceManagementPrivateView from '@/views/solutions/service-management/ServiceManagementPrivateView'
import ServiceManagementPublicView from '@/views/solutions/service-management/ServiceManagementPublicView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Gestão de Serviços',
}

export default async function FieldServicePage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      {session ? (
        session.user.profile == 'GUEST' ? (
          <ServiceManagementPublicView />
        ) : (
          <ServiceManagementPrivateView
            session={session!}
            metadata={metadata!}
          />
        )
      ) : (
        <ServiceManagementPublicView />
      )}
    </main>
  )
}
