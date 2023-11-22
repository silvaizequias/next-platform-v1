import Box from '@/components/box'
import { UserType } from '@/types/user'

interface Props {
  user: UserType
}

export default function ProfileRight(props: Props) {
  const { user } = props

  return (
    <Box>
      <div className='flex flex-1'>
        <span>Profile Right</span>
      </div>
    </Box>
  )
}
