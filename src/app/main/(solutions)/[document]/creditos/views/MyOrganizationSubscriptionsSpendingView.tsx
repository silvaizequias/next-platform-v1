'use client'

import { Box, LinearProgress, Typography } from '@mui/material'
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
    <Box sx={{ width: '100%', paddingBottom: '20px' }}>
      <Typography variant="caption">
        {`consumo de créditos da organização: ${spending}/100`}
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  )
}
