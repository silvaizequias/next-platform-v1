'use client'

import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material'
import { Login } from '@mui/icons-material'
import { Session } from 'next-auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { blue } from '@mui/material/colors'
import AuthTabs from './tabs'

export default function UserAuth({ session }: { session: Session }) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const router = useRouter()

  const handleClick = () => {
    session ? router.push('/profile') : setOpenModal(!openModal)
  }

  return (
    <Box>
      <Tooltip title={session ? 'Ver Perfil' : 'Autenticar-se'}>
        <IconButton
          onClick={handleClick}
          size="large"
          edge="end"
          color="inherit"
          sx={{ ml: 2 }}
        >
          {session ? (
            <Avatar sx={{ p: 0 }} alt="Dedicado Digital" src="/logotipo5.png" />
          ) : (
            <Login />
          )}
        </IconButton>
      </Tooltip>
      <Dialog
        maxWidth={'md'}
        keepMounted
        open={openModal}
        onClose={handleClick}
      >
        <DialogContent sx={{ width: 480 }}>
          <DialogContentText>
            <AuthTabs />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
