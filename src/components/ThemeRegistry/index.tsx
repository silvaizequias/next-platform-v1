'use client'
import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import NextAppDirEmotionCacheProvider from './EmotionCache'
import theme from './theme'
import { SessionProvider } from 'next-auth/react'

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <CssBaseline />
          {children}
        </SessionProvider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
