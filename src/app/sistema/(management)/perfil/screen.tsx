'use client'

import Avatar from '@/components/avatar'
import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'

export default function ProfileScreen() {
  const { data: profile, mutate } = useFetch<UserType | any>('/api/profile')

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="min-w-220 sm:max-w-260 md:max-w-[320px] w-full p-4">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Avatar image={profile?.image} size={110} />
            <h4 className="text-xl text-slate-400 font-medium">{profile?.name}</h4>
            <span className="bg-slate-50 text-slate-400 rounded-md py-2 px-4 text-xs">
              {profile?.profile}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md"></div>
    </div>
  )
}
