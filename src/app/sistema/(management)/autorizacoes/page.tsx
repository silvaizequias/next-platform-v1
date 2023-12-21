import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import UnauthorizedAccess from '@/components/unauthorized-access'
import AuthorizationScreen from './screen'

export default async function AuthorizationPage() {
  const session = await getServerSession(authOptions)

  return session && session.user?.profile == 'MASTER' ? (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Autorizações de Acesso
          </h4>
          <AuthorizationScreen />
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedAccess />
  )
}
