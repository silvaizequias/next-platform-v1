'use client'

import useFetch from '@/hooks/use-fetch'
import { SolutionType } from '@/types/solution'

export default function SolutionListView() {
  const { data: solutions } = useFetch<SolutionType[] | any>('/api/solutions')

  return ''
}
