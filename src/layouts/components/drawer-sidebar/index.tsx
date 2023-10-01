import { DrawerSideBarProps } from '@/layouts/types'
import { Drawer } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function DrawerSideBar(props: DrawerSideBarProps) {
  const { open, onClose } = props

  const handleClose = () => {
    onClose()
  }

  const handleSignOut = () => {
    onClose()
    signOut()
  }

  const LINKS = [
    { text: 'Home', href: '/', icon: '' },
    { text: 'Starred', href: '/starred', icon: '' },
    { text: 'Tasks', href: '/tasks', icon: '' },
  ]

  const PLACEHOLDER_LINKS = [
    { text: 'Settings', icon: '' },
    { text: 'Support', icon: '' },
  ]

  return (
    <Drawer
      open={open}
      anchor='left'
      variant='persistent'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 300 } }}
    >...</Drawer>
  )
}
