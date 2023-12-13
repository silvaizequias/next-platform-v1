'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        <Toaster
          position={'top-center'}
          toastOptions={{ className: 'react-hot-toast' }}
        />
      </ThemeProvider>
    </NextUIProvider>
  )
}
