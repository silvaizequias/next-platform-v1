'use client'

import CrispChat from '@/components/crisp-chat'
import NextAppDirEmotionCacheProvider from '@/components/emotion-cache'
import ToastProvider from '@/components/hot-toast'
import defaultTheme from '@/theme/default'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <main>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          {children}
          <ToastProvider />
          {!isDevelopment && <CrispChat />}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </main>
  )
}
