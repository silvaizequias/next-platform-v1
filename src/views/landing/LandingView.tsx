'use client'

import * as React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

export default function LandingView() {
  const handleGoogleSignIn = async () => {
    await signIn('google')
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
        </Box>
      </Box>
    </Box>
  )
}
