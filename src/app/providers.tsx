'use client'

import CrispChat from '@/components/crisp-chat'
import { Fragment, ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <CrispChat />
    </Fragment>
  )
}
