'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { ServiceType } from './types'
import { Container } from '@mui/material'

export default function ServicesView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const {
    data: services,
    error,
    mutate,
  } = useFetch<ServiceType[]>(`/api/services`)

  return <Container maxWidth='xl'>{user?.name}</Container>
}
