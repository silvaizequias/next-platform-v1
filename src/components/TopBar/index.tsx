'use client'

import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineLogout, MdMenu, MdLensBlur, MdBadge } from 'react-icons/md'
import DrawerNavBar from '../DrawerNavBar'
import { blue } from '@mui/material/colors'
import { SessionProps } from '@/types'
import { useFetch } from '@/hooks/useFetch'

export default function TopBar(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: profile, error, mutate } = useFetch(`/api/profile/${user?.id}`)

  const [openNavBar, setOpenNavBar] = useState<boolean>(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleNavBar = () => {
    setOpenNavBar(!openNavBar)
  }

  const handleUserMenu = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    signOut()
    handleUserMenu()
  }

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ pr: 2 }}>
              <Avatar
                sx={{ cursor: 'pointer', bgcolor: blue[500] }}
                alt='Dedicado Digital'
                variant='rounded'
                onClick={() => handleUserMenu('/')}
              >
                <MdLensBlur />
              </Avatar>
            </Box>

            <Box>
              <Tooltip title='Menu'>
                <IconButton
                  sx={{ p: 0, color: 'white' }}
                  onClick={handleNavBar}
                >
                  <MdMenu />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <DrawerNavBar
            open={openNavBar}
            onClose={handleNavBar}
            profile={profile}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Abrir'>
              <IconButton
                sx={{ p: 0 }}
                size='small'
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  alt={profile?.name}
                  src={profile?.avatar || '/avatar.png'}
                />
              </IconButton>
            </Tooltip>

            <Menu
              id='menu-appbar'
              anchorEl={anchorElUser}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={() => handleUserMenu()}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              sx={{ mt: '15px' }}
            >
              <MenuItem onClick={() => handleUserMenu('/profile')}>
                <ListItemIcon>
                  <MdBadge />
                </ListItemIcon>
                <ListItemText>Perfil</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <MdOutlineLogout sx={{ pr: 2 }} />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
