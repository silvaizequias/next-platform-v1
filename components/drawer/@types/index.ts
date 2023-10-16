import { ReactNode } from 'react'

export interface DrawerProps {
  children?: ReactNode
  open: boolean
  onClose: () => void
  title?: string
}
