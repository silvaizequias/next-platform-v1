import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function UserView(props: Props) {
  const { session } = props

  return ''
}
