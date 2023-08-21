import { Fragment } from 'react'
import { UserLayoutProps } from './types'
import UserAppBar from './components/UserAppBar'


export default function UserLayout(props: UserLayoutProps) {
  const { children } = props

  return (
    <Fragment>
      <UserAppBar />
      {children}
    </Fragment>
  )
}
