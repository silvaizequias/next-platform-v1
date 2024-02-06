'use client'

import { SessionProvider } from 'next-auth/react'
import { Fragment, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Fragment>
        {children}
        <Toaster
          position={'top-center'}
          toastOptions={{ className: 'react-hot-toast' }}
        />
      </Fragment>
    </SessionProvider>
  )
}
