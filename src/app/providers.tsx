'use client'

import CrispChat from '@/components/crisp-chat'
import ToastProvider from '@/components/hot-toast'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <ToastProvider />
      <CrispChat />
    </main>
  )
}
