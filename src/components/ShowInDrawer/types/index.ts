import { ReactNode } from 'react'

export interface ShowInDrawerProps {
  children: ReactNode
  onClose: () => void
  open: boolean
  title: string
}
