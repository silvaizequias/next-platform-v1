'use client'

import Loading from '@/app/loading'
import useFetch from '@/hooks/use-fetch'
import { Suspense } from 'react'

export default function OrganizationTable() {
  const { data: organizations } = useFetch('/api/organizations')

  return (
    <Suspense fallback={<Loading />}>{JSON.stringify(organizations)}</Suspense>
  )
}
