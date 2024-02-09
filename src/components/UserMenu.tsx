'use client'

import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { MouseEvent, useCallback, useState } from 'react'
import { UserType } from '@/app/main/(management)/users/types'
import { AssignmentInd, Logout } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  profile: UserType | any
}

export default function UserMenu(props: Props) {
  const { profile } = props

  const avatar = '/avatar.svg'

  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleClick = useCallback(
    (path?: string) => {
      path && router.push(path)
      setAnchorElUser(null)
    },
    [router],
  )

  const handleSignOut = useCallback(() => {
    signOut()
    setAnchorElUser(null)
    toast.success(`até logo ${profile?.name}`)
  }, [profile?.name])

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={profile?.name}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
          <Avatar
            alt={profile?.name}
            src={profile?.image || avatar}
            sx={{ width: 28, height: 28 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: 6 }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleClick()}
      >
        <MenuItem onClick={() => handleClick(`/profile`)}>
          <ListItemIcon>
            <AssignmentInd fontSize="small" />
          </ListItemIcon>
          <ListItemText>meu perfil</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSignOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>sair</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
