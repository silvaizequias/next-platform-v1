'use client'

import Loading from '@/app/loading'
import Box from '@/components/box'
import Container from '@/components/container'
import useFetch from '@/hooks/use-fetch'
import { Suspense } from 'react'

export default function ServiceTab() {
  const { data: services } = useFetch('/api/services')

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <Box>{JSON.stringify(services)}</Box>
      </Container>
    </Suspense>
  )
}
