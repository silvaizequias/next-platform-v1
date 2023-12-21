import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import UserScreen from './screen'
import UnauthorizedAccess from '@/components/unauthorized-access'

export default async function UserPage() {
  const session = await getServerSession(authOptions)

  return session && session.user?.profile == 'MASTER' ? (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Usuários do Sistema
          </h4>
          <UserScreen />
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedAccess />
  )
}
