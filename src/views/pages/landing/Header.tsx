import { Typography, Button, Box } from '@mui/material'
import HeaderLayout from './HeaderLayout'

import { useState } from 'react'

import HeaderContactDialog from './HeaderContactDialog'
import HeaderRegisterDialog from './HeaderRegisterDialog'

const backgroundImage = '/bg/bg-header.jpg'

export default function Header() {
  const [openContact, setOpenContact] = useState<boolean>(false)
  const [openRegister, setOpenRegister] = useState<boolean>(false)

  const handleClickOpenContact = () => setOpenContact(true)
  const handleClickOpenRegister = () => setOpenRegister(true)

  const handleDialogOptionsClose = () => {
    setOpenContact(false)
    setOpenRegister(false)
  }

  return (
    <HeaderLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'black',
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt='increase priority'
      />
      <Typography color='inherit' align='center' variant='h2'>
        <span style={{ color: '#6096B4' }}>SOLUÇÕES CRIATIVAS</span> PARA
        ENRIQUECER SEU NEGÓCIO
      </Typography>
      <Typography
        color='inherit'
        align='center'
        variant='h5'
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Disponibilizamos uma ferramenta flexível e inovadora que aumenta a
        produtividade de pessoas e organizações.
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          color='primary'
          variant='contained'
          size='large'
          component='a'
          onClick={handleClickOpenContact}
          sx={{ mx: 2, minWidth: 200, mt: { xs: 4, sm: 10 } }}
        >
          FAÇA CONTATO
        </Button>
        <HeaderContactDialog
          open={openContact}
          onClose={handleDialogOptionsClose}
        />
        <Button
          color='info'
          variant='contained'
          size='large'
          component='a'
          onClick={handleClickOpenRegister}
          sx={{ mx: 2, minWidth: 200, mt: { xs: 4, sm: 10 } }}
        >
          REGISTRE-SE
        </Button>
        <HeaderRegisterDialog
          open={openRegister}
          onClose={handleDialogOptionsClose}
        />
      </Box>

      <Typography variant='body2' color='inherit' sx={{ mt: 2 }}>
        E TENHA UM SISTEMA DEDICADO
      </Typography>
    </HeaderLayout>
  )
}
