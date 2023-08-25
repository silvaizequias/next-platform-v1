'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Fragment } from 'react'
import { ServiceType } from './types'

export default function ServicesView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const {
    data: services,
    error,
    mutate,
  } = useFetch<ServiceType[]>(`/api/services`)

  return <Fragment>...</Fragment>
}
