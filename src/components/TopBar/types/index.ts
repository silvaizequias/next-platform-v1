import { Session } from 'next-auth'

export interface TopBarProps {
  session: Session | null
}
