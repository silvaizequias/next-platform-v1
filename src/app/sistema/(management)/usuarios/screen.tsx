'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'

export default function UserScreen() {
  const { data: users } = useFetch<UserType[] | any>(
    '/api/platform-management/users',
  )

  return (
    <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md"></div>
  )
}
