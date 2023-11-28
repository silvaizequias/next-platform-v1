'use client'

import useFetch from '@/hooks/use-fetch'
import { OrderAttachmentType } from '@/types/order'
import LoadingView from '@/views/loading'
import { Session } from 'next-auth'
import { Suspense } from 'react'

interface Props {
  session: Session
}

export default function ServiceAttachmentTable(props: Props) {
  const { session } = props
  const SERVICE_MANAGEMENTE_API_URL =
    process.env.NEXT_PUBLIC_SERVICE_MANAGEMENTE_API_URL!

  const { data: attachments } = useFetch<OrderAttachmentType[]>(
    `${SERVICE_MANAGEMENTE_API_URL}/attachments`,
  )

  return (
    <Suspense fallback={<LoadingView />}>
      {JSON.stringify(attachments)}
    </Suspense>
  )
}
