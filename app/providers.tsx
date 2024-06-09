'use client'

import { ReactNode } from 'react'
import './globals.css'

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div>{children}</div>
}
