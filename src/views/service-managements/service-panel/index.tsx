import { Session } from 'next-auth'
import { Fragment } from 'react'
import ServiceAttachmentTable from '../attachment/attachment-table'
import ServiceOrderTable from '../orders/order-table'
import ServiceOrderItemTable from '../order-items/item-table'

interface Props {
  session: Session
}

export default function ServicePanel(props: Props) {
  const { session } = props

  return (
    <Fragment>
      <ServiceAttachmentTable session={session} />
      <ServiceOrderTable session={session} />
      <ServiceOrderItemTable session={session} />
    </Fragment>
  )
}
