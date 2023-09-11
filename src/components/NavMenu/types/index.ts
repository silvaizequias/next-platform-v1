import { UserType } from '@/views/control/users/types'

export interface NavMenuProps {
  onClose: () => void
  user?: UserType
}
