import { Session } from 'next-auth'
import SwitchTheme from '../switch-theme'
import UserBar from '../userbar'

interface Props {
  session: Session
}

export default function ToolBar(props: Props) {
  const { session } = props

  return (
    <div className="flex gap-4">
      <SwitchTheme />
      <UserBar session={session} />
    </div>
  )
}
