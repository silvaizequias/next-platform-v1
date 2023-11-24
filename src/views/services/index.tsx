import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ServiceView(props: Props) {
  const { session } = props

  return ''
}
