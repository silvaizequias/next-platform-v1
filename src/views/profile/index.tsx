'use client'

import useFetch from '@/hooks/use-fetch'
import { Session } from 'next-auth'
import { Suspense } from 'react'
import LoadingView from '../loading'
import ProfileLeft from './profile-left'
import ProfileRight from './profile-right'
import { UserType } from '@/types/user'

interface Props {
  session: Session
}

export default function ProfileView(props: Props) {
  const { session } = props
  const { data: user } = useFetch<UserType>(`/api/users/${session?.user?.id}`)

  return (
    <Suspense fallback={<LoadingView />}>
      <ProfileLeft user={user!} />
      <ProfileRight user={user!} />
    </Suspense>
  )
}
