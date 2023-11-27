import { Session } from 'next-auth'
import ServicePanel from './service-panel'
import UnauthorizedView from '../unauthorized'

interface Props {
  session: Session
}

export default function ServiceManagementsView(props: Props) {
  const { session } = props

  return session ? (
    <ServicePanel session={session} />
  ) : (
    <UnauthorizedView session={session} />
  )
}
