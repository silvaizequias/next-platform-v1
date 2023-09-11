import { useRouter } from 'next/navigation'
import { UserToolBarProps } from './types'
import { useState } from 'react'
import {
  Avatar,
  Box,
  Chip,
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
import { MdLensBlur, MdMenu, MdOutlineLogout } from 'react-icons/md'
import { blue } from '@mui/material/colors'
import DrawerNavBar from '../DrawerNavBar'

export default function UserToolBar(props: UserToolBarProps) {
  const { user } = props

  const [openNavBar, setOpenNavBar] = useState<boolean>(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleNavBar = () => {
    setOpenNavBar(!openNavBar)
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
            onClick={() => handleTopBarMenu('/')}
          >
            <MdLensBlur />
          </Avatar>
        </Box>

        <Box>
          <Tooltip title='Menu'>
            <IconButton sx={{ p: 0, color: blue[500] }} onClick={handleNavBar}>
              <MdMenu />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <DrawerNavBar open={openNavBar} onClose={handleNavBar} user={user} />

      <Box sx={{ flexGrow: 0 }}>
        <Chip
          label={`Olá ${user?.name.split(' ')[0]}`}
          color='primary'
          variant='filled'
          sx={{ marginX: 1 }}
        />
        <Tooltip title='Abrir'>
          <IconButton sx={{ p: 0 }} size='small' onClick={handleOpenUserMenu}>
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
  )
}
