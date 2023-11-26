'use client'

import useFetch from '@/hooks/use-fetch'
import { ServiceType } from '@/types/service'
import LoadingView from '@/views/loading'
import { Session } from 'next-auth'
import { Suspense } from 'react'

interface Props {
  session: Session
}

export default function ServiceBox(props: Props) {
  const { session } = props
  const { data: services } = useFetch<ServiceType[]>('/api/services')

  return (
    <Suspense fallback={<LoadingView />}>{JSON.stringify(services)}</Suspense>
  )
}
