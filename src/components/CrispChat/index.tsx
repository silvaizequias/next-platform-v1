'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID as string
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL as string

  useEffect(() => {
    Crisp.configure(CRISP_WEBSITE_ID, { clientUrl: NEXTAUTH_URL })
  }, [CRISP_WEBSITE_ID, NEXTAUTH_URL])

  return null
}
