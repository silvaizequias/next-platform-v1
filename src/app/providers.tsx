'use client'

import ThemeRegistry from '@/components/ThemeRegistry'
import ToastProvider from '@/components/ToastProvider'
import { LayoutProps } from '@/types'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { SessionProvider } from 'next-auth/react'

export default function Providers(props: LayoutProps) {
  const { children } = props

  return (
    <SessionProvider>
      <ThemeRegistry>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>
      </ThemeRegistry>
    </SessionProvider>
  )
}
