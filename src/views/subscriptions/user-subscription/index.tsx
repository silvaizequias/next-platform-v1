import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function UserSubscription(props: Props) {
  const { session } = props

  return ''
}
