import { UserType } from '@/types/user'
import UserUpdateForm from './UserUpdateForm'
import { KeyedMutator } from 'swr'

interface Props {
  user: UserType
  users: UserType[]
  mutate: KeyedMutator<[]>
}

export default function UserUpdate(props: Props) {
  const { user, users, mutate } = props

  return <UserUpdateForm user={user} users={users} mutate={mutate} />
}
