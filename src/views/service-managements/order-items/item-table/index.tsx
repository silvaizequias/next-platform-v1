'use client'

import useFetch from '@/hooks/use-fetch'
import { OrderItemType } from '@/types/order'
import LoadingView from '@/views/loading'
import { Session } from 'next-auth'
import { Suspense } from 'react'

interface Props {
  session: Session
}

export default function ServiceOrderItemTable(props: Props) {
  const { session } = props
  const SERVICE_MANAGEMENTE_API_URL =
    process.env.NEXT_PUBLIC_SERVICE_MANAGEMENTE_API_URL!
  const { data: items } = useFetch<OrderItemType[]>(
    `${SERVICE_MANAGEMENTE_API_URL}/items`,
  )

  return <Suspense fallback={<LoadingView />}>{JSON.stringify(items)}</Suspense>
}
