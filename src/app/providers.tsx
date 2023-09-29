'use client'

import { LayoutProps } from '@/layouts/types'
import themeOptions from '@/theme'
import NextAppDirEmotionCacheProvider from '@/theme/EmotionCache'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { SessionProvider } from 'next-auth/react'

export default function Providers(props: LayoutProps) {
  const { children } = props

  return (
    <SessionProvider>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={themeOptions}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </SessionProvider>
  )
}
