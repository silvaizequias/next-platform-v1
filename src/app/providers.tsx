'use client'

import ThemeRegistry from '@/components/theme-registry'
import { LayoutProps } from '@/types'
import { SessionProvider } from 'next-auth/react'

export default function Providers(props: LayoutProps) {
  const { children } = props

  return (
    <SessionProvider>
      <ThemeRegistry>{children}</ThemeRegistry>
    </SessionProvider>
  )
}
