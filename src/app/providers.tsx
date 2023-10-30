'use client'

import CrispChat from '@/components/crisp-chat'
import ToastProvider from '@/components/hot-toast'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
        <ToastProvider />
        <CrispChat />
      </LocalizationProvider>
    </main>
  )
}
