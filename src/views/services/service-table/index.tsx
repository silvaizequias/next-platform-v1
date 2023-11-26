'use client'

import useFetch from '@/hooks/use-fetch'
import { ServiceType } from '@/types/service'
import LoadingView from '@/views/loading'
import { Suspense } from 'react'

export default function ServiceTable() {
  const { data: services } = useFetch<ServiceType[]>('/api/services')

  return (
    <Suspense fallback={<LoadingView />}>{JSON.stringify(services)}</Suspense>
  )
}
