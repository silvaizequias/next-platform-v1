import { UserType } from '@/views/control/users/types'
import { Session } from 'next-auth'

export interface TopBarProps {
  session: Session | null
}

export interface UserToolBarProps {
  user: UserType
}
