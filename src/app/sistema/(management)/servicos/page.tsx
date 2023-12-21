import UnauthorizedAccess from '@/components/unauthorized-access'
import ServiceScreen from './screen'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'

export default async function ServicePage() {
  const session = await getServerSession(authOptions)

  return session && session.user?.profile == 'MASTER' ? (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Sistema de Serviços
          </h4>
          <ServiceScreen />
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedAccess />
  )
}
