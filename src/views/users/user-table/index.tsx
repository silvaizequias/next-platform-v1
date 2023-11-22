'use client'

import Loading from '@/app/loading'
import Box from '@/components/box'
import useFetch from '@/hooks/use-fetch'
import { Suspense } from 'react'

export default function UserTable() {
  const { data: users } = useFetch('/api/users')

  return (
    <Suspense fallback={<Loading />}>
      <Box>{JSON.stringify(users)}</Box>
    </Suspense>
  )
}
