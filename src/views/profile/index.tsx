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
  const PLATFORM_MANAGEMENT_API_URL =
    process.env.NEXT_PUBLIC_PLATFORM_MANAGEMENT_API_URL!

  const { data: profile } = useFetch<UserType>(
    `${PLATFORM_MANAGEMENT_API_URL}/users/${session?.user?.id}`,
    session?.user?.authorization,
  )

  return (
    <Suspense fallback={<LoadingView />}>
      <ProfileLeft user={profile!} />
      <ProfileRight user={profile!} />
    </Suspense>
  )
}
