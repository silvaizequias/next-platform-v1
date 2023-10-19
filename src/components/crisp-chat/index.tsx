'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export default function CrispChat() {
  const NEXT_PUBLIC_CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!

  useEffect(() => {
    Crisp.configure(NEXT_PUBLIC_CRISP_WEBSITE_ID)
  }, [NEXT_PUBLIC_CRISP_WEBSITE_ID])

  return null
}
