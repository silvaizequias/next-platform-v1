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
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <Typography variant='h3' marginBottom={2} textTransform={'uppercase'}>
        Gestão de Sistemas
      </Typography>
      <AuthView />
    </Box>
  )
}
