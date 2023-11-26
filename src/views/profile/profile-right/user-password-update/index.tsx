import UserPasswordUpdateForm from './UserPasswordUpdateForm'
import { UserType } from '@/types/user'

interface Props {
  user: UserType
}

export default function UserPasswordUpdate(props: Props) {
  const { user } = props

  return <UserPasswordUpdateForm user={user} />
}
