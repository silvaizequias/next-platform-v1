import { DrawerSideBarProps } from '@/layouts/types'
import { SidebarLinks } from '@/navigation'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { MdOutlineLogout } from 'react-icons/md'

export default function DrawerSideBar(props: DrawerSideBarProps) {
  const { open, onClose } = props

  const handleClose = () => {
    onClose()
  }

  const handleSignOut = () => {
    onClose()
    signOut()
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor='left'
      variant='persistent'
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          height: 'auto',
          bottom: 0,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 65,
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: blue[600], textTransform: 'uppercase', mx: 2 }}
        >
          Dedicado Digital
        </Typography>
      </Box>
      <List>
        {SidebarLinks.map(({ title, path, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton component={Link} href={path}>
              <ListItemIcon sx={{ color: blue[600] }}>
                <Icon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: 12,
                    color: blue[600],
                  }}
                >
                  {title}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <List>
        <ListItemButton onClick={handleSignOut}>
          <ListItemIcon sx={{ color: blue[600] }}>
            <MdOutlineLogout />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontSize: 12,
                color: blue[600],
              }}
            >
              Sair
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
