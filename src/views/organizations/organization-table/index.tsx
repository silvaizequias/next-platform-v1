'use client'

import Loading from '@/app/loading'
import Box from '@/components/box'
import useFetch from '@/hooks/use-fetch'
import { Suspense } from 'react'

export default function OrganizationTable() {
  const { data: organizations } = useFetch('/api/organizations')

  return (
    <Suspense fallback={<Loading />}>
      <Box>{JSON.stringify(organizations)}</Box>
    </Suspense>
  )
}
