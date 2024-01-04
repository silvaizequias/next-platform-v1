import { UserType } from '@/types/platform-management/user'
import ProfileRightView from './views/ProfileRightView'
import ProfileAvatarView from './views/ProfileAvatarView'

interface Props {
  profile: UserType
}

export default function ProfileScreen(props: Props) {
  const { profile } = props

  const avatar = '/avatar.svg'

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="min-w-220 sm:max-w-260 md:max-w-[320px] w-full p-4">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <ProfileAvatarView image={profile?.image || avatar} />
            <h6 className="text-xl sm:text-2xl text-slate-400 font-medium">
              {profile?.name.split(' ')[0]}
            </h6>
            <span className="bg-slate-50 text-slate-400 rounded-md shadow-md py-2 px-4 text-xs">
              {profile?.profile}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-1 flex-col justify-center">
          <ProfileRightView profile={profile} />
        </div>
      </div>
    </div>
  )
}
