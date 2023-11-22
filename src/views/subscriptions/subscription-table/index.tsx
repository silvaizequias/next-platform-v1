'use client'

import Loading from '@/app/loading'
import useFetch from '@/hooks/use-fetch'
import { Suspense } from 'react'

export default function SubscriptionTable() {
  const { data: subscriptions } = useFetch('/api/subscriptions')

  return (
    <Suspense fallback={<Loading />}>{JSON.stringify(subscriptions)}</Suspense>
  )
}
