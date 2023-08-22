'use client'

import { useFetch } from '@/hooks/useFetch'
import { ProfileType } from './types'
import { SessionProps } from '@/types'
import { Fragment } from 'react'

export default function ProfilePage(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: profile, error, mutate } = useFetch<ProfileType>(
    `/api/profile/${user?.id}`,
  )

  return <Fragment>{profile?.name}</Fragment>
}
