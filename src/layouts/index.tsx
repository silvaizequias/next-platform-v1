'use client'

import { Suspense, useState } from 'react'
import { DefaultLayoutProps } from './types'
import TopBar from './components/topbar'
import { Box } from '@mui/material'
import { Container } from '@mui/system'
import { blue, grey } from '@mui/material/colors'
import Spinner from '@/components/spinner'

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children, session } = props

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: blue[600],
          color: grey[50],
        }}
      >
        <TopBar session={session!} onClose={handleDrawer} />
        <Box sx={{ ml: openDrawer ? '240px' : '0px' }}>
          <Container maxWidth='xl' sx={{ pt: 6 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </Suspense>
  )
}
