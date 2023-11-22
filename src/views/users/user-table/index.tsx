'use client'

import useFetch from '@/hooks/use-fetch'

export default function UserTable() {
  const { data: users } = useFetch('/api/users')

  return JSON.stringify(users)
}
