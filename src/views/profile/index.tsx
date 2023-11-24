import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ProfileView(props: Props) {
  const { session } = props

  return ''
}
