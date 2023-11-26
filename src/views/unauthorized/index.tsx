import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function UnauthorizedView(props: Props) {
  const { session } = props

  return ''
}
