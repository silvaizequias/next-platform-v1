'use client'

import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div>
      {children}
      <Toaster
        position={'top-center'}
        toastOptions={{ className: 'react-hot-toast' }}
      />
      {!isDevelopment && <Analytics />}
    </div>
  )
}
