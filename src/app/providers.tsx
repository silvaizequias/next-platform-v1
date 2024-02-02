'use client'

import { SessionProvider } from 'next-auth/react'
import { Fragment, ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Fragment>{children}</Fragment>
    </SessionProvider>
  )
}
