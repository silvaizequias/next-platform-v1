import { UserToolbarProps } from '@/layouts/types'
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdApps, MdOutlineLogout } from 'react-icons/md'

export default function UserToolbar(props: UserToolbarProps) {
  const { user } = props.session
  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleMenuDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const hendleMenuItem = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    signOut()
    hendleMenuItem()
  }

  return (
    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'right' }}>
      <Box>
        <Tooltip title={user?.name}>
          <IconButton
            sx={{ p: 0, ml: 1 }}
            size='medium'
            onClick={handleMenuDropdown}
          >
            <Avatar alt={user?.name!} src={user?.image! || '/avatar.png'} />
          </IconButton>
        </Tooltip>

        <Menu
          id='menu-appbar'
          anchorEl={anchorElUser}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={() => hendleMenuItem()}
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
