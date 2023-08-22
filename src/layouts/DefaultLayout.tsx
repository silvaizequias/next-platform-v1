import { Fragment } from 'react'
import UserAppBar from './components/UserAppBar'
import { DefaultLayoutProps } from './types'

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children } = props

  return (
    <Fragment>
      <UserAppBar />
      {children}
    </Fragment>
  )
}
