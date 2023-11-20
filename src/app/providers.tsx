'use client'

import CrispChat from '@/components/crisp-chat'
import ToastProvider from '@/components/toast-provider'
import { Provider as BalancerProvider } from 'react-wrap-balancer'
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/react'
import { Fragment, ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <NextUIProvider>
      <BalancerProvider>{children}</BalancerProvider>
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
