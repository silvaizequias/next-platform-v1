'use client'

import useFetch from '@/hooks/use-fetch'
import { OrganizationType } from '@/types/platform-management/organization'

export default function OrganizationListView() {
  const { data: organizations } = useFetch<OrganizationType[] | any>(
    '/api/platform-management/organizations',
  )

  return ''
}
