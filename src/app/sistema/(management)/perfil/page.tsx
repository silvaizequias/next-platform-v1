import ProfileScreen from './screen'
import { getProfile } from '@/utils/get-data'

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <ProfileScreen profile={profile} />
        </div>
      </div>
    </div>
  )
}
