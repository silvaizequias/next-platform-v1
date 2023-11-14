'use client'

import ToastProvider from '@/components/toast-provider'
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <NextUIProvider>
      {children}
      <ToastProvider />
      {!isDevelopment && <Analytics />}
    </NextUIProvider>
  )
}
