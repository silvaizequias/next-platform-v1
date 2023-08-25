'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Fragment } from 'react'

export default function ContractsView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: contracts, error, mutate } = useFetch(`/api/contracts`)

  return <Fragment>...</Fragment>
}
