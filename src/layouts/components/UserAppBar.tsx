'use client'

import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'

export default function UserAppBar() {
  const handleSignOut = () => {
    signOut(), redirect('/')
  }
  return (
    <AppBar position='fixed' color='default' elevation={0}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Button
          onClick={handleSignOut}
          variant='outlined'
          size='small'
          sx={{ my: 1, mx: 1.5 }}
          endIcon={<LogoutIcon />}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  )
}
