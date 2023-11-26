import { UserType } from '@/types/user'
import { Fragment } from 'react'
import UserPasswordUpdate from './user-password-update'

interface Props {
  user: UserType
}

export default function ProfileRight(props: Props) {
  const { user } = props

  return (
    <Fragment>
      <UserPasswordUpdate user={user} />
    </Fragment>
  )
}
