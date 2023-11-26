import { UserType } from '@/types/user'
import { Fragment } from 'react'
import ProfileImageUpdate from './profile-image-update'

interface Props {
  user: UserType
}

export default function ProfileLeft(props: Props) {
  const { user } = props

  return (
    <Fragment>
      <ProfileImageUpdate user={user} />
      {JSON.stringify(user)}
    </Fragment>
  )
}
