'use client'

import useFetch from '@/hooks/use-fetch'
import { AuthorizationType } from '@/types/authorization'

export default function AuthorizationListView() {
  const { data: autorizations } = useFetch<AuthorizationType[] | any>(
    '/api/authorizations',
  )

  return ''
}
