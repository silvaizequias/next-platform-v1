import { UserType } from '@/types/user'
import UserCreateForm from './UserCreateForm'
import { KeyedMutator } from 'swr'

interface Props {
  users: UserType[]
  mutate: KeyedMutator<[]>
}

export default function CreateUser(props: Props) {
  const { users, mutate } = props

  return <UserCreateForm users={users} mutate={mutate} />
}
