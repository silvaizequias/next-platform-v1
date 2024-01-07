import { Session } from 'next-auth'
import { Fragment } from 'react'

interface Props {
  session: Session
}

export default function ManagementScreen(props: Props) {
  const { session } = props
  return (
    <Fragment>
      <span>management screen</span>
    </Fragment>
  )
}
