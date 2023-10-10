import { Box, Button, Divider } from '@mui/material'
import { grey } from '@mui/material/colors'
import { MdPhonelinkLock } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { Fragment, useState } from 'react'
import { signIn } from 'next-auth/react'
import ShowInDialog from '@/components/show-in-dialog'
import AuthTabsView from './AuthTabsView'

export default function AuthView() {
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }

  return (
    <Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          size='small'
          variant='contained'
          color='info'
          sx={{ m: 2 }}
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
          }}
        >
          ou
        </Divider>
        <Button
          size='small'
          variant='contained'
          color='primary'
          sx={{ m: 2 }}
          onClick={handleDialog}
          startIcon={<MdPhonelinkLock />}
        >
          Acesse com o Celular
        </Button>
      </Box>
      <ShowInDialog open={showDialog} onClose={handleDialog}>
        <AuthTabsView />
      </ShowInDialog>
    </Fragment>
  )
}
