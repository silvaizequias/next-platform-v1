import { UserType } from '@/types/user'
import ProfileAvatar from './ProfileAvatar'
import { MdAccountBox } from 'react-icons/md'
import ProfileInformations from './ProfileInformations'
import ProfilePassword from './ProfilePassword'

interface Props {
  data: UserType | any
}

export default function ProfileView(props: Props) {
  const { data } = props

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-wrap justify-center items-center w-full sm:max-w-xs p-2">
        <div className="flex flex-col justify-center items-center gap-4">
          <ProfileAvatar image={data?.image} />
          <div className="p-2 flex items-center space-x-1 w-full mx-auto bg-sky-600 rounded-md shadow-md">
            <MdAccountBox size={24} />
            <p className="text-base font-semibold text-slate-200">
              {data?.profile}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 w-full min-w-md p-4 bg-slate-200 rounded-md">
        <div className="relative w-full space-y-2">
          <ProfileInformations data={data} />
          <hr className="border-1 border-slate-400" />
          <ProfilePassword />
        </div>
      </div>
    </div>
  )
}
