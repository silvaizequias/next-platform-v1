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
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center item-center mb-2">
              <div className="p-10 rounded-full bg-slate-50 border-4 border-sky-600 shadow-lg">
                <Avatar image={profile?.image} size={160} />
              </div>
            </div>
            <h4 className="text-xl sm:text-4xl text-slate-400 font-medium">
              {profile?.name.split(' ')[0]}
            </h4>
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
