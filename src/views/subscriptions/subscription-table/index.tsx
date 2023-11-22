'use client'

import Loading from '@/app/loading'
import Box from '@/components/box'
import useFetch from '@/hooks/use-fetch'
import { Suspense } from 'react'

export default function SubscriptionTable() {
  const { data: subscriptions } = useFetch('/api/subscriptions')

  return (
    <Suspense fallback={<Loading />}>
      <Box>{JSON.stringify(subscriptions)}</Box>
    </Suspense>
  )
}
