import { Session } from 'next-auth'
import OrganizationTable from './organization-table'
import OrganizationUserView from './organization-user'

interface Props {
  session: Session
}

export default function OrganizationView(props: Props) {
  const { session } = props

  return session?.user?.profile == 'MASTER' ? (
    <OrganizationTable session={session} />
  ) : (
    <OrganizationUserView session={session} />
  )
}
