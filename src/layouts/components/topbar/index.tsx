'use client'

import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import UserAuth from '../user-auth'
import { Session } from 'next-auth'
import { useState } from 'react'
import { blue } from '@mui/material/colors'
import ActionsToolbar from '../actions-toolbar'

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

          <Link
            sx={{
              fontSize: 18,
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'white',
              '&:hover': { color: blue[200] },
            }}
            href={'/'}
          >
            Dedicado
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {!session && <ActionsToolbar session={session} />}
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
