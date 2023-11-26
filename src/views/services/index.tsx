import { Session } from 'next-auth'
import ServiceTable from './service-table'
import ServiceBox from './service-box'

interface Props {
  session: Session
}

export default function ServiceView(props: Props) {
  const { session } = props

  return session?.user?.profile == 'MASTER' ? (
    <ServiceTable />
  ) : (
    <ServiceBox session={session} />
  )
}
