'use client'

import * as React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { MdPhonelinkLock } from 'react-icons/md'
import ShowInDialog from '@/components/ShowInDialog'
import AuthTabsView from '../auth/AuthTabsView'

export default function LandingView() {
  const [showDialog, setShowDialog] = React.useState<boolean>(false)

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: blue[800],
      }}
    >
      <Box className='content-center'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Divider
            sx={{
              textAlign: 'center',
              color: grey[200],
              textTransform: 'uppercase',
            }}
          >
            Portal do Sistema
          </Divider>
          <Typography
            variant='h4'
            color='white'
            textTransform='uppercase'
            text-align='center'
          >
            Dedicado Digital
          </Typography>
        </Box>
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
              fontSize: 9
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
      </Box>
    </Box>
  )
}
