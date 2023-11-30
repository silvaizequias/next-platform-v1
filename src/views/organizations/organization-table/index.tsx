'use client'

import useFetch from '@/hooks/use-fetch'
import LoadingView from '@/views/loading'
import { Session } from 'next-auth'
import { Suspense } from 'react'

interface Props {
  session: Session
}

export default function OrganizationTable(props: Props) {
  const { session } = props
  const PLATFORM_MANAGEMENT_API_URL =
    process.env.NEXT_PUBLIC_PLATFORM_MANAGEMENT_API_URL!
  const { data: organizations } = useFetch(
    `${PLATFORM_MANAGEMENT_API_URL}/organizations`,
    session?.user?.authorization,
  )

  return (
    <Suspense fallback={<LoadingView />}>
      {JSON.stringify(organizations)}
    </Suspense>
  )
}
