import { UserType } from '@/views/users/types'

export interface NavMenuProps {
  onClose: () => void
  user?: UserType
}
