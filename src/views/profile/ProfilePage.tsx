'use client'

import { useFetch } from '@/hooks/useFetch'
import { ProfileType } from './types'
import { SessionProps } from '@/types'

export default function ProfilePage(props: SessionProps) {
  const { user }: any = props?.session
  const { data: profile, mutate } = useFetch<ProfileType>(
    `/api/profile/${user?.id}`,
  )

  return ''
}
