'use client'

import { Box } from '@mui/system'
import { Divider, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
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
      <Box sx={{ marginTop: 28, maxWidth: 480 }}>
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
          textTransform='uppercase'
          text-align='center'
        >
          Dedicado Digital
        </Typography>
        <AuthView />
      </Box>
    </Box>
  )
}
