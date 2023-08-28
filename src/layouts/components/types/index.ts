import { ProfileType } from '@/views/profile/types'

export interface DrawerNavBarProps {
  open: boolean
  onClose: () => void
  profile?: ProfileType
}

export interface NavMenuProps {
  onClose: () => void
  profile?: ProfileType
}
