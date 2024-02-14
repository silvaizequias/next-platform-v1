'use client'

import { SessionProvider } from 'next-auth/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Fragment, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Fragment>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>
        <Toaster
          position={'top-center'}
          toastOptions={{ className: 'react-hot-toast' }}
        />
      </Fragment>
    </SessionProvider>
  )
}
