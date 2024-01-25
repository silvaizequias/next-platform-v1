'use client'

import { Session } from 'next-auth'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  IconButton,
} from '@material-tailwind/react'
import {
  ArrowRightStartOnRectangleIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'

interface Props {
  session: Session
}

export default function UserMenu(props: Props) {
  const { session } = props

  const image = '/avatar.svg'

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const router = useRouter()
  const handleClick = useCallback(
    (path?: string) => {
      path && path ? router.push(path) : signOut()
    },
    [router],
  )

  return session ? (
    <div className="block relative">
      <Menu
        placement="bottom-end"
        open={openMenu}
        handler={setOpenMenu}
        allowHover
      >
        <MenuHandler>
          <IconButton variant="text" color="blue-gray" className="rounded-full">
            <Avatar
              variant="circular"
              alt={session?.user?.name!}
              src={image}
              size="xs"
            />
          </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => handleClick('/profile')}
          >
            <IdentificationIcon className="h-6 w-6" />
            <Typography variant="small" className="font-medium">
              Meu Perfil
            </Typography>
          </MenuItem>
          <hr className="my-2 border-blue-gray-50" />
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => handleClick()}
          >
            <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
            <Typography variant="small" className="font-medium">
              Sair
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  ) : null
}
