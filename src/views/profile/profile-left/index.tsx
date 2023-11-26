import { UserType } from '@/types/user'

interface Props {
  user: UserType
}

export default function ProfileLeft(props: Props) {
  const { user } = props

  return JSON.stringify(user?.name)
}
