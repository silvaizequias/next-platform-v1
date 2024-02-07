'use client'

import {
  Box,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'

interface Props {
  spending: number | 0
}

export default function MyOrganizationSubscriptionsSpendingView(props: Props) {
  const { spending } = props
  const [progress, setProgress] = useState(spending || 0)

  useCallback(() => {
    setProgress((spending) => {
      if (spending === 100) {
        return 0
      }
      return Math.min(spending, 100)
    })
  }, [])

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          maxWidth: 'md',
          width: '100%',
          paddingY: 1,
        }}
      >
        <Stack>
          <Typography variant="caption">
            {`consumo de créditos desta organização: ${spending}/100`}
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Stack>
      </Box>
    </Container>
  )
}
