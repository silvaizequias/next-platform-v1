'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'

export default function UserListView() {
  const { data: users } = useFetch<UserType[] | any>(
    '/api/platform-management/users',
  )

  return ''
}
