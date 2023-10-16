'use client'

import OpenWhatsApp from '@/components/open-whatsapp'
import { ThemeProvider } from '@material-tailwind/react'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <OpenWhatsApp />
    </ThemeProvider>
  )
}
