'use client'

import { PlatformContext } from '@/app/core/contexts/platform.context'
import { useContext } from 'react'

export default function Articles() {
  const { countArticles, articles } = useContext(PlatformContext)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      lista de artigos
    </div>
  )
}
