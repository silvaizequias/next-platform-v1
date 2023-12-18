import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import UnauthorizedAccess from '@/components/unauthorized-access'
import SolutionScreen from './screen'

export default async function SolutionPage() {
  const session = await getServerSession(authOptions)

  return session && session.user?.profile == 'MASTER' ? (
    <div className="flex flex-col justify-center">
      <div className="max-w-full pt-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Soluções do Sistema
          </h4>
          <SolutionScreen />
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedAccess />
  )
}
