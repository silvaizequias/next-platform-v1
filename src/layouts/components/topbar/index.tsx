'use client'

import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { TopBarProps } from '@/layouts/types'
import UserToolbar from '../user-toolbar'
import { grey } from '@mui/material/colors'
import { MdDensityMedium, MdLogin } from 'react-icons/md'
import DrawerSideBar from '../drawer-sidebar'
import ShowInDialog from '@/components/show-in-dialog'
import AuthTabsView from '@/views/auth/AuthTabsView'
import { usePathname } from 'next/navigation'

export default function TopBar(props: TopBarProps) {
  const { session, onClose } = props

  const pathname = usePathname()

  const [showDrawerSideBar, setShowDrawerSideBar] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleDrawerSideBar = () => {
    setShowDrawerSideBar(!showDrawerSideBar)
    onClose()
  }

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{ bgcolor: 'transparent', position: 'absolute', top: 0 }}
    >
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'left' }}
        >
          {session && (
            <Tooltip title='Menu'>
              <IconButton
                sx={{
                  p: 1,
                  ml: !showDrawerSideBar ? 0 : 30,
                  color: grey[50],
                }}
                onClick={handleDrawerSideBar}
              >
                <MdDensityMedium />
              </IconButton>
            </Tooltip>
          )}
          {!showDrawerSideBar && (
            <Typography
              variant='h6'
              sx={{ color: grey[50], textTransform: 'uppercase', ml: 1 }}
            >
              Dedicado Digital
            </Typography>
          )}
        </Toolbar>
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'right' }}
        >
          {!session ? (
            pathname !== '/' && (
              <Tooltip title='Acessar'>
                <IconButton
                  sx={{
                    p: 1,
                    ml: !showDrawerSideBar ? 0 : 30,
                    color: grey[50],
                  }}
                  onClick={handleDialog}
                >
                  <MdLogin />
                </IconButton>
              </Tooltip>
            )
          ) : (
            <Tooltip title='Acessar'>
              <IconButton
                sx={{
                  p: 1,
                  ml: !showDrawerSideBar ? 0 : 30,
                  color: grey[50],
                }}
                onClick={handleDialog}
              >
                <MdLogin />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Container>
      <DrawerSideBar open={showDrawerSideBar} onClose={handleDrawerSideBar} />
    </AppBar>
  )
}
