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
      <BalancerProvider>
        <main className=" text-sky-800 bg-slate-200 dark:text-sky-600 dark:bg-slate-800">
          {children}
        </main>
      </BalancerProvider>
      <Toaster
        position={'top-center'}
        toastOptions={{ className: 'react-hot-toast' }}
      />
      {!isDevelopment && <Analytics />}
    </SessionProvider>
  )
}
