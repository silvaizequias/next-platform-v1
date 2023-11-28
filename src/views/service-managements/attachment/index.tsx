import { Fragment } from 'react'
import ServiceAttachmentTable from './attachment-table'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ServiceAttachmentView(props: Props) {
  const { session } = props

  return (
    <Fragment>
      <ServiceAttachmentTable session={session} />
    </Fragment>
  )
}
