'use client'

import { useFetch } from '@/hooks/useFetch'

export default function Home() {
  const { data } = useFetch(`/api`)

  return data ? JSON.stringify(data) : null
}
