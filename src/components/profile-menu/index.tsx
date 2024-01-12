'use client'

import { UserType } from '@/app/management/users/types'
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react'
import { signOut } from 'next-auth/react'
import { MdLogout } from 'react-icons/md'

interface Props {
  profile: UserType
}

export default function ProfileMenu(props: Props) {
  const { profile } = props
  const avatar = 'avatar.svg'

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt={profile?.name}
          className="cursor-pointer"
          src={profile?.image || avatar}
          size="xs"
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2" onClick={() => signOut()}>
          <MdLogout />
          <Typography variant="small" className="font-medium">
            sair
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
