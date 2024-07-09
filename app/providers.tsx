'use client'

import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import 'moment/locale/pt-br'
import './globals.css'
import PlatformProvider from './core/contexts/platform.context'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PlatformProvider>
      <div className="min-h-screen w-full">
        {children}
        <Toaster
          position={'top-center'}
          toastOptions={{ className: 'react-hot-toast' }}
        />
      </div>
    </PlatformProvider>
  )
}
