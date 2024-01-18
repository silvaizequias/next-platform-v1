import { UserType } from '../../types'
import UpdateUserForm from './form'

interface Props {
  user: UserType
}

export default function UserUpdateView(props: Props) {
  const { user } = props

  return <UpdateUserForm user={user} />
}
