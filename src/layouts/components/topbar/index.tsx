'use client'

import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import UserAuth from '../user-auth'
import { Session } from 'next-auth'
import { useState } from 'react'

export default function Topbar({ session }: { session: Session }) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Container maxWidth="xl">
        <Toolbar>
          {session && (
            <Tooltip onClick={handleDrawer} title={'Menu'}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            </Tooltip>
          )}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { textTransform: 'uppercase' },
            }}
          >
            Dedicado
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}></Box>
          <UserAuth session={session} />
        </Toolbar>
      </Container>
      <Drawer
        open={openDrawer}
        onClose={handleDrawer}
        variant="temporary"
        keepMounted
        sx={{ maxWidth: 240, boxSizing: 'border-box' }}
      >
        <Box sx={{ minWidth: 240 }}></Box>
      </Drawer>
    </AppBar>
  )
}
