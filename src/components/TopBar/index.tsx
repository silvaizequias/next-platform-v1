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
  Typography,
} from '@mui/material'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineLogout, MdApps } from 'react-icons/md'
import { blue } from '@mui/material/colors'
import { TopBarProps } from './types'

export default function TopBar(props: TopBarProps) {
  const { user }: any = props.session

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleTopBarMenu = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    signOut()
    handleTopBarMenu()
  }

  return (
    <AppBar position='sticky' elevation={0} sx={{ bgcolor: 'transparent' }}>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'right' }}
        >
          <Box>
            <Tooltip title='Serviços'>
              <IconButton sx={{ p: 1, color: blue[600] }} size='large'>
                <MdApps />
              </IconButton>
            </Tooltip>
            <Tooltip title={user?.name}>
              <IconButton
                sx={{ p: 0 }}
                size='small'
                onClick={handleOpenUserMenu}
              >
                <Avatar alt={user?.name!} src={user?.image! || '/avatar.png'} />
              </IconButton>
            </Tooltip>

            <Menu
              id='menu-appbar'
              anchorEl={anchorElUser}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={() => handleTopBarMenu()}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              sx={{ mt: '15px', textTransform: 'uppercase' }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <MdOutlineLogout sx={{ pr: 2 }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography fontSize={12}>Sair</Typography>
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
