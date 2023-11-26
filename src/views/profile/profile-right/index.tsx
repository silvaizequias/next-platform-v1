import { UserType } from '@/types/user'
import { Fragment } from 'react'
import ProfilePasswordUpdate from './profile-password-update'
import ProfileInformations from './profile-informations'

interface Props {
  user: UserType
}

export default function ProfileRight(props: Props) {
  const { user } = props

  return (
    <Fragment>
      <ProfileInformations user={user} />
      <ProfilePasswordUpdate user={user} />
    </Fragment>
  )
}
