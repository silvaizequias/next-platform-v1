'use client'

import ToastProvider from '@/components/toast-provider'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <ToastProvider />
    </NextUIProvider>
  )
}
