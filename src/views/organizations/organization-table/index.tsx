'use client'

import useFetch from '@/hooks/use-fetch'
import LoadingView from '@/views/loading'
import { Suspense } from 'react'

export default function OrganizationTable() {
  const { data: organizations } = useFetch('/api/organizations')

  return (
    <Suspense fallback={<LoadingView />}>
      {JSON.stringify(organizations)}
    </Suspense>
  )
}
