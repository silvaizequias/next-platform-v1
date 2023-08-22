'use client'

import DefaultLayout from '@/layouts/DefaultLayout'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <DefaultLayout>{children}</DefaultLayout>
    </SessionProvider>
  )
}
