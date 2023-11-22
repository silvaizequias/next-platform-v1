import { Session } from 'next-auth'
import ServiceTab from './service-tab'
import ServiceBox from './service-box'

interface Props {
  session: Session
}

export default function ServiceView(props: Props) {
  const { session } = props

  return session && session?.user?.profile == 'MASTER' ? (
    <ServiceTab />
  ) : (
    <ServiceBox />
  )
}
