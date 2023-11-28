import { Session } from 'next-auth'
import { Fragment } from 'react'
import ServiceOrderTable from './order-table'

interface Props {
  session: Session
}

export default function ServiceOrderView(props: Props) {
  const { session } = props

  return (
    <Fragment>
      <ServiceOrderTable session={session} />
    </Fragment>
  )
}
