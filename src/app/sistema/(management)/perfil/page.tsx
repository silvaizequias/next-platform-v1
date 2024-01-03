import { getServerSession } from 'next-auth'
import ProfileScreen from './screen'
import { authOptions } from '@/libraries/next-auth'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <ProfileScreen session={session!} />
        </div>
      </div>
    </div>
  )
}
