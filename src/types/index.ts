import { Session } from 'next-auth'
import { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export interface SessionProps {
  session: Session | null
}
