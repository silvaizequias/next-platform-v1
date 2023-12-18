'use client'

import useFetch from '@/hooks/use-fetch'
import { SolutionType } from '@/types/solution'

export default function SolutionScreen() {
  const { data: solutions } = useFetch<SolutionType[] | any>(
    '/api/platform-management/users',
  )

  return (
    <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md"></div>
  )
}
