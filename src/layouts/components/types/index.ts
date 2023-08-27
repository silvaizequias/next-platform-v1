import { Session } from 'next-auth'

export interface DrawerNavBarProps {
  open: boolean
  onClose: () => void
  session?: Session | null
}

export interface NavMenuProps {
  onClose: () => void
  session?: Session | null
}
