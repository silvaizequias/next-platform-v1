'use client'

import CrispChat from '@/components/crisp-chat'
import ToastProvider from '@/components/hot-toast'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <ToastProvider />
      <CrispChat />
    </NextUIProvider>
  )
}
