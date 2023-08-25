'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Fragment } from 'react'
import { InvoiceType } from './types'

export default function InvoicesView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const {
    data: invoices,
    error,
    mutate,
  } = useFetch<InvoiceType[]>(`/api/invoices`)

  return <Fragment>...</Fragment>
}
