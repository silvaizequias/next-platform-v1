import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ProfileLeft(props: Props) {
  const { session } = props

  return ''
}
