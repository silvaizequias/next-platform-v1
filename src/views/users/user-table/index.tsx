'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/user'
import LoadingView from '@/views/loading'
import { Suspense } from 'react'

export default function UserTable() {
  const { data: users } = useFetch<UserType[]>('/api/users')

  return <Suspense fallback={<LoadingView />}>{JSON.stringify(users)}</Suspense>
}
