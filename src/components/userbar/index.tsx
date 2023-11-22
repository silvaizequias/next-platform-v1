import { Session } from 'next-auth'
import UserBox from './userbox'
import AuthBox from './authbox'

interface Props {
  session: Session
}

export default function UserBar(props: Props) {
  const { session } = props

  return session ? <UserBox session={session} /> : <AuthBox />
}
