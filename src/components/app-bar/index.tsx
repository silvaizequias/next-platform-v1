import { Session } from 'next-auth'
import UserMenu from '../user-menu'
import MegaMenu from '../mega-menu'
import UserAuth from '../user-auth'

interface Props {
  session: Session
}

export default function Appbar(props: Props) {
  const { session } = props

  return (
    <div className="blockh-auto">
      <div className="flex items-center justify-center gap-4">
        <MegaMenu session={session} />
        <UserMenu session={session} />
        {!session && <UserAuth />}
      </div>
    </div>
  )
}
