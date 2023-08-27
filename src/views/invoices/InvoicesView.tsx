'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { InvoiceType } from './types'
import { Container } from '@mui/material'

export default function InvoicesView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const {
    data: invoices,
    error,
    mutate,
  } = useFetch<InvoiceType[]>(`/api/invoices`)

  return <Container maxWidth='xl'>{user?.name}</Container>
}
