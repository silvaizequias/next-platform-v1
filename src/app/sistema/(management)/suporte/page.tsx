import { getServerSession } from 'next-auth'
import SupportScreen from './screen'
import { authOptions } from '@/libraries/next-auth'
import UnauthorizedAccess from '@/components/unauthorized-access'

export default async function SupportPage() {
  const session = await getServerSession(authOptions)

  return session && session.user?.profile == 'MASTER' ? (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Sistema de Suporte
          </h4>
          <SupportScreen />
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedAccess />
  )
}
