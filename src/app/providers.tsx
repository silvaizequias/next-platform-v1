'use client'

import { Analytics } from '@vercel/analytics/react'
import { Provider as BalancerProvider } from 'react-wrap-balancer'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <SessionProvider>
      <BalancerProvider>{children}</BalancerProvider>
      <Toaster
        position={'top-center'}
        toastOptions={{ className: 'react-hot-toast' }}
      />
      {!isDevelopment && <Analytics />}
    </SessionProvider>
  )
}
