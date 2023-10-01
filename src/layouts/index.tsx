'use client'

import { Suspense, useState } from 'react'
import { DefaultLayoutProps } from './types'
import { usePathname } from 'next/navigation'
import TopBar from './components/topbar'
import { Box } from '@mui/material'
import { Container } from '@mui/system'
import { blue, grey } from '@mui/material/colors'

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children, session } = props

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  //TODO: tratar a cor do background e o display
  return (
    <Suspense fallback={'...'}>
      <Box
        sx={{
          height: '100vh',
          margin: 'auto',
          bgcolor: blue[600],
          color: grey[50],
        }}
      >
        <TopBar session={session!} onClose={handleDrawer} />
        <Box sx={{ ml: openDrawer ? '300px' : '0px' }}>
          <Container maxWidth='xl' sx={{ pt: 6 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </Suspense>
  )
}
