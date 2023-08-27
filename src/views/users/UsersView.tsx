'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { UserType } from './types'
import { Container } from '@mui/material'

export default function UsersView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: users, error, mutate } = useFetch<UserType[]>(`/api/users`)

  return <Container maxWidth='xl'>{user?.name}</Container>
}
