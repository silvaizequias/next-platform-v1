'use client'

import CrispChat from '@/components/crisp-chat'
import NextAppDirEmotionCacheProvider from '@/components/emotion-cache'
import ToastProvider from '@/components/hot-toast'
import defaultTheme from '@/theme/default'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <main>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={defaultTheme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CssBaseline />
            {children}
            <ToastProvider />
            <CrispChat />
          </LocalizationProvider>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </main>
  )
}
