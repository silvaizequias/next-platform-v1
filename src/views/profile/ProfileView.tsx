'use client'

import { useFetch } from '@/hooks/useFetch'
import { ProfileType } from './types'
import { SessionProps } from '@/types'
import { Container } from '@mui/material'

export default function ProfileView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const {
    data: profile,
    error,
    mutate,
  } = useFetch<ProfileType>(`/api/profile/${user?.id}`)

  return <Container maxWidth='xl'>{user?.name}</Container>
}
