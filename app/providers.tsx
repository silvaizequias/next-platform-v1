'use client'

import { Fragment, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Fragment>
      {children}
      <Toaster
        position={'top-center'}
        toastOptions={{ className: 'react-hot-toast' }}
      />
    </Fragment>
  )
}
