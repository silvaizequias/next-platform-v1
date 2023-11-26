import { Session } from 'next-auth'
import OrganizationUserView from '../organizations/organization-user'
import { Fragment } from 'react'
import UserSubscription from '../subscriptions/user-subscription'

interface Props {
  session: Session
}

export default function AccountView(props: Props) {
  const { session } = props

  return (
    <Fragment>
      <OrganizationUserView session={session} />
      <UserSubscription session={session} />
    </Fragment>
  )
}
