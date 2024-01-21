'use client'

import FullScreen from '@/components/full-screen'
import { Spinner } from '@material-tailwind/react'

export default function Loading() {
  return (
    <FullScreen>
      <Spinner className="h-16 w-16 text-light-blue-800/80" />
    </FullScreen>
  )
}
