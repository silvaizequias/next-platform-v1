'use client'

import { LayoutProps } from '@/types'
import { SessionProvider } from 'next-auth/react'

export default function Providers(props: LayoutProps) {
  const { children } = props

  return <SessionProvider>{children}</SessionProvider>
}
