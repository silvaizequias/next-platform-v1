import { Session } from 'next-auth'
import UserTable from './user-table'
import UnauthorizedView from '../unauthorized'

interface Props {
  session: Session
}

export default function UserView(props: Props) {
  const { session } = props

  return session?.user?.profile == 'MASTER' ? (
    <UserTable />
  ) : (
    <UnauthorizedView session={session} />
  )
}
