'use client'

import CrispChat from '@/components/crisp-chat'
import ToastProvider from '@/components/toast-provider'
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/react'
import { Fragment, ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <NextUIProvider>
      {children}
      <ToastProvider />
      {!isDevelopment && (
        <Fragment>
          <Analytics />
          <CrispChat />
        </Fragment>
      )}
    </NextUIProvider>
  )
}
