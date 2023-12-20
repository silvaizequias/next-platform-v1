import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import OrganizationScreen from './screen'
import { redirect } from 'next/navigation'

export default async function OrganizationPage() {
  const session = await getServerSession(authOptions)

  return session && session.user?.profile == 'MASTER' ? (
    <div className="flex flex-col justify-center">
      <div className="max-w-full pt-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Organizações do Sistema
          </h4>
          <OrganizationScreen />
        </div>
      </div>
    </div>
  ) : (
    redirect('/')
  )
}
