import { Session } from 'next-auth'
import { Fragment } from 'react'
import ServiceOrderItemTable from './item-table'

interface Props {
  session: Session
}

export default function ServiceOrderItemsView(props: Props) {
  const { session } = props

  return (
    <Fragment>
      <ServiceOrderItemTable session={session} />
    </Fragment>
  )
}
