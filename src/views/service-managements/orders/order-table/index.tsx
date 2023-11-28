'use client'

import useFetch from '@/hooks/use-fetch'
import { OrderType } from '@/types/order'
import LoadingView from '@/views/loading'
import { Session } from 'next-auth'
import { Suspense } from 'react'

interface Props {
  session: Session
}

export default function ServiceOrderTable(props: Props) {
  const SERVICE_MANAGEMENTE_API_URL =
    process.env.NEXT_PUBLIC_SERVICE_MANAGEMENTE_API_URL!
  const { session } = props
  const { data: orders } = useFetch<OrderType[]>(
    `${SERVICE_MANAGEMENTE_API_URL}/orders`,
  )

  return (
    <Suspense fallback={<LoadingView />}>{JSON.stringify(orders)}</Suspense>
  )
}
