'use client'

import useFetch from '@/hooks/use-fetch'
import { AuthorizationType } from '@/types/authorization'

export default function AuthorizationScreen() {
  const { data: autorizations } = useFetch<AuthorizationType[] | any>(
    '/api/authorizations',
  )

  return (
    <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md"></div>
  )
}
