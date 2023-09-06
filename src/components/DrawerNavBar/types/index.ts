import { UserType } from '@/views/users/types'

export interface DrawerNavBarProps {
  open: boolean
  onClose: () => void
  user?: UserType
}
