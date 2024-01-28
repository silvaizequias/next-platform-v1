'use client'

import { Session } from 'next-auth'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
} from '@material-tailwind/react'
import {
  Bars3Icon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  session: Session
}

export default function MegaMenu(props: Props) {
  const { session } = props

  const router = useRouter()
  const handleClick = useCallback(
    (path?: string) => {
      path && router.push(path)
    },
    [router],
  )

  const [openMenu, setOpenMenu] = useState<boolean>(false)

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
            <Bars3Icon className="h-6 w-6" />
          </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => handleClick('/')}
          >
            <BuildingOfficeIcon className="h-6 w-6" />
            <Typography variant="small" className="font-medium">
              início
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => handleClick('/users')}
          >
            <UserGroupIcon className="h-6 w-6" />
            <Typography variant="small" className="font-medium">
              usuários
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => handleClick('/organizations')}
          >
            <BuildingOffice2Icon className="h-6 w-6" />
            <Typography variant="small" className="font-medium">
              organizações
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  ) : null
}
