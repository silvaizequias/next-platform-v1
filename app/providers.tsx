'use client'

import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import './globals.css'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      {children}
      <Toaster
        position={'top-center'}
        toastOptions={{ className: 'react-hot-toast' }}
      />
    </div>
  )
}
