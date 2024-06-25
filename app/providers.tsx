'use client'

import './globals.css'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return <div className="min-h-screen w-full">{children}</div>
}
