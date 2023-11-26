import ProfilePasswordUpdateForm from './ProfilePasswordUpdateForm'
import { UserType } from '@/types/user'

interface Props {
  user: UserType
}

export default function ProfilePasswordUpdate(props: Props) {
  const { user } = props

  return <ProfilePasswordUpdateForm user={user} />
}
