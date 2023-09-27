'use client'

import ToastProvider from '@/components/ToastProvider'
import { LayoutProps } from '@/types'
import { SessionProvider } from 'next-auth/react'

export default function Providers(props: LayoutProps) {
  const { children } = props

  return (
    <SessionProvider>
      {children}
      <ToastProvider />
    </SessionProvider>
  )
}
