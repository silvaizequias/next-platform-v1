'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID as string

  useEffect(() => {
    Crisp.configure('CRISP_WEBSITE_ID')
  }, [])

  return null
}
