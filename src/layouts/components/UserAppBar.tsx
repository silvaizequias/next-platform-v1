import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'

export default function UserAppBar() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut(), redirect('/')
  }

  return session ? (
    <AppBar position='fixed' color='default' elevation={0}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          {session?.user?.name}
        </Typography>

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
  ) : null
}
