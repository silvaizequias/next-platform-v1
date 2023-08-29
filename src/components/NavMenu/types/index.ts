import { ProfileType } from '@/views/profile/types'

export interface NavMenuProps {
  onClose: () => void
  profile?: ProfileType
}
