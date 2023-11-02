'use client'

import { Avatar, Box, Dialog, IconButton, Tooltip } from '@mui/material'
import { Login } from '@mui/icons-material'
import { Session } from 'next-auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthTabs from './tabs'

export default function UserAuth({ session }: { session: Session }) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const router = useRouter()

  const handleClick = () => {
    session ? router.push('/perfil') : setOpenModal(!openModal)
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
      <Dialog keepMounted open={openModal} onClose={handleClick}>
        <Box sx={{ maxWidth: 400 }}>
          <AuthTabs />
        </Box>
      </Dialog>
    </Box>
  )
}
