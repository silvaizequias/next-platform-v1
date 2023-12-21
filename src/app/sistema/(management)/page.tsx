import { getServerSession } from 'next-auth'
import MainScreen from './screen'
import { authOptions } from '@/libraries/next-auth'

export default async function MainPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Sistema Dedicado
          </h4>
          <MainScreen session={session!} />
        </div>
      </div>
    </div>
  )
}
