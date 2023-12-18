'use client'

import useFetch from '@/hooks/use-fetch'
import { OrganizationType } from '@/types/platform-management/organization'

export default function OrganizationScreen() {
  const { data: organizations } = useFetch<OrganizationType[] | any>(
    '/api/platform-management/users',
  )

  return (
    <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md"></div>
  )
}
