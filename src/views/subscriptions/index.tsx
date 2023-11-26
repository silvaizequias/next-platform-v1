import { Session } from 'next-auth'
import SubscriptionTable from './subscription-table'
import UserSubscription from './user-subscription'

interface Props {
  session: Session
}

export default function SubscriptionView(props: Props) {
  const { session } = props

  return session?.user?.profile == 'MASTER' ? (
    <SubscriptionTable />
  ) : (
    <UserSubscription session={session} />
  )
}
