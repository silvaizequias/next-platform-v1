'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/user'
import LoadingView from '@/views/loading'
import { Session } from 'next-auth'
import { Suspense } from 'react'

interface Props {
  session: Session
}

export default function UserTable(props: Props) {
  const { session } = props
  const PLATFORM_MANAGEMENT_API_URL =
    process.env.NEXT_PUBLIC_PLATFORM_MANAGEMENT_API_URL!

  const { data: users } = useFetch<UserType[]>(
    `${PLATFORM_MANAGEMENT_API_URL}/users`,
    session?.user?.authorization,
  )

  return <Suspense fallback={<LoadingView />}>{JSON.stringify(users)}</Suspense>
}
