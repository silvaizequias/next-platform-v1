'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen w-full">{children}</div>
      <Toaster
        position={'top-center'}
        toastOptions={{ className: 'react-hot-toast' }}
      />
    </SessionProvider>
  )
}
