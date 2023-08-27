'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Container } from '@mui/material'

export default function ContractsView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: contracts, error, mutate } = useFetch(`/api/contracts`)

  return <Container maxWidth='xl'>{user?.name}</Container>
}
