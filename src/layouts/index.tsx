'use client'

import { Suspense, useState } from 'react'
import { DefaultLayoutProps } from './types'
import { Box } from '@mui/material'
import Spinner from '@/components/spinner'
import { blue, grey } from '@mui/material/colors'
import TopBar from './components/topbar'

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children, session } = props
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: blue[600],
        color: grey[50],
      }}
    >
      <TopBar session={session!} onClose={handleDrawer} />
      <Box
        sx={
          session
            ? { mt: 4, ml: openDrawer ? '240px' : '4px' }
            : {
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }
        }
      >
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </Box>
    </Box>
  )
}
