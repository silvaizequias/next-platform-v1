import { DrawerSideBarProps } from '@/layouts/types'
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

  return <h1>drawer sidebar</h1>
}
