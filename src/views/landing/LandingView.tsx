'use client'

import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import AuthView from '../auth/AuthView'

export default function LandingView() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 480 }}>
        <Typography
          variant='h3'
          marginBottom={2}
          textTransform={'uppercase'}
          textAlign='center'
        >
          Sistema Dedicado
        </Typography>
        <AuthView />
      </Box>
    </Box>
  )
}
