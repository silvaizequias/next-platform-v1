import { UserType } from './types'

interface Props {
  users: UserType
}

export default function UserScreen(props: Props) {
  const { users } = props

  return 'user screen'
}
