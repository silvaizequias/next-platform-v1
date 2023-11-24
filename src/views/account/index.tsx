import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function AccountView(props: Props) {
  const { session } = props

  return ''
}
