import { Session } from 'next-auth'
import { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export interface PageViewProps {
  session: Session
}

export interface DefaultLayoutProps {
  children: ReactNode
  session: Session
}

export interface TopBarProps {
  onClose: () => void
  session: Session
}

export interface UserToolbarProps {
  session: Session
}

export interface DrawerSideBarProps {
  onClose: () => void
  open: boolean
}
