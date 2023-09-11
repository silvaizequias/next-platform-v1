import { UserType } from '@/views/control/users/types'

export interface DrawerNavBarProps {
  open: boolean
  onClose: () => void
  user?: UserType
}
