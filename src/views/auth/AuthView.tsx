import { Box, Button, Card, Divider } from '@mui/material'
import { grey } from '@mui/material/colors'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import AuthTabsView from './AuthTabsView'

export default function AuthView() {
  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        fullWidth
        size='small'
        variant='contained'
        color='info'
        sx={{ mx: 'auto' }}
        onClick={handleGoogleSignIn}
        startIcon={<FcGoogle />}
      >
        Acesse com o Google
      </Button>
      <Divider
        sx={{
          textAlign: 'center',
          color: grey[200],
          textTransform: 'uppercase',
          fontSize: 9,
          p: 2,
        }}
      >
        ou
      </Divider>
      <Card elevation={4} sx={{ maxWidth: 480 }}>
        <AuthTabsView />
      </Card>
    </Box>
  )
}
