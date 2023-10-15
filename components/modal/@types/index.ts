import { ReactNode } from 'react'

export interface ModalProps {
  children?: ReactNode
  open: boolean
  onClose: () => void
  subtitle?: string
  title?: string
}
