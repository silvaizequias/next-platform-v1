'use client'

import useFetch from '@/hooks/use-fetch'
import { SubscriptionType } from '@/types/subscription'
import LoadingView from '@/views/loading'
import { Suspense } from 'react'

export default function SubscriptionTable() {
  const { data: subscriptions } =
    useFetch<SubscriptionType[]>('/api/subscriptions')

  return (
    <Suspense fallback={<LoadingView />}>
      {JSON.stringify(subscriptions)}
    </Suspense>
  )
}
