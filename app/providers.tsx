'use client'

import './globals.css'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
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
