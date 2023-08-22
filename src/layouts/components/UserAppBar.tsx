import { AppBar, Button, Toolbar, Typography, useTheme } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSettings } from '@/hooks/userSettings'

export default function UserAppBar() {
  const { data: session } = useSession()
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings

  const handleSignOut = () => {
    signOut(), redirect('/')
  }

  return session ? (
    <AppBar position='sticky' color='default' elevation={skin === 'bordered' ? 0 : 3}
    sx={{
      backgroundColor: 'background.paper',
      ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` })
    }}>
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
