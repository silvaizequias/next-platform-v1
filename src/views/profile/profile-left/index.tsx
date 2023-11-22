import Box from '@/components/box'
import { UserType } from '@/types/user'

interface Props {
  user: UserType
}

export default function ProfileLeft(props: Props) {
  const { user } = props

  return (
    <Box>
      <span>Profile Left</span>
    </Box>
  )
}
