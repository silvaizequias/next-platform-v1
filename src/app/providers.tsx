'use client'

import ToastProvider from '@/components/toast-provider'
import { LayoutProps } from '@/layouts/types'
import themeOptions from '@/theme'
import NextAppDirEmotionCacheProvider from '@/theme/EmotionCache'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { SessionProvider } from 'next-auth/react'

export default function Providers(props: LayoutProps) {
  const { children } = props

  return (
    <SessionProvider>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={themeOptions}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {children}
            <ToastProvider />
          </LocalizationProvider>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </SessionProvider>
  )
}
