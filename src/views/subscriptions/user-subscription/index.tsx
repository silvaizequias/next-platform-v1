'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/user'
import LoadingView from '@/views/loading'
import { Session } from 'next-auth'
import { Suspense } from 'react'

interface Props {
  session: Session
}

export default function UserSubscription(props: Props) {
  const { session } = props
  const { data: user } = useFetch<UserType>(`/api/users/${session?.user?.id}`)

  return (
    <Suspense fallback={<LoadingView />}>
      {JSON.stringify(user?.subscriptions)}
    </Suspense>
  )
}
