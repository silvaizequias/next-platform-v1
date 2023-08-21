'use client'

import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function UserAppBar() {
  const handleSignOut = () => {
    signOut(), redirect('/')
  }
  return (
    <AppBar
      position='fixed'
      color='default'
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Company name
        </Typography>

        <Button
          onClick={handleSignOut}
          variant='outlined'
          sx={{ my: 1, mx: 1.5 }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  )
}
