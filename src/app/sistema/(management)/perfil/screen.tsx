'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'
import { Avatar } from '@material-tailwind/react'

export default function ProfileScreen() {
  const { data: profile, mutate } = useFetch<UserType | any>('/api/profile')

  const avatar = '/avatar.svg'

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="min-w-220 sm:max-w-260 md:max-w-[320px] w-full p-4">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center item-center mb-2">
              <div className="rounded-full p-2 opacity-25 hover:opacity-95 hover:bg-gray-50 cursor-pointer">
                <Avatar size="xl" src={profile?.image || avatar} />
              </div>
            </div>
            <h6 className="text-xl sm:text-2xl text-slate-400 font-medium">
              {profile?.name.split(' ')[0]}
            </h6>
            <span className="bg-slate-50 text-slate-400 rounded-md shadow-md py-2 px-4 text-xs">
              {profile?.profile}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md"></div>
    </div>
  )
}
