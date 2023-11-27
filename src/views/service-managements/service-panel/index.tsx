import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ServicePanel(props: Props) {
  const { session } = props

  return ''
}
