import Box from '@/components/box'
import { UserType } from '@/types/user'
import { Avatar, Chip } from '@nextui-org/react'

interface Props {
  user: UserType
}

export default function ProfileLeft(props: Props) {
  const { user } = props

  return (
    <Box>
      <div className="flex flex-col items-center gap-2 md:w-[220px]">
        <Avatar
          isBordered
          size="lg"
          src={user?.image || '/avatar.png'}
          className="cursor-pointer hover:opacity-50"
        />
        <h4>{user?.name}</h4>
        <Chip color="primary" size="sm">
          {user?.profile}
        </Chip>
      </div>
    </Box>
  )
}
