import { Session } from 'next-auth'
import { Fragment } from 'react'
import LandingView from './views/LandingView'

interface Props {
  session: Session
}

export default function ManagementScreen(props: Props) {
  const { session } = props
  return session ? (
    <Fragment>
      <span>management screen</span>
    </Fragment>
  ) : (
    <LandingView />
  )
}
