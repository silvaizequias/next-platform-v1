import { ReactNode, SyntheticEvent } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

import Icon from 'src/@core/components/icon'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FooterIllustrationsV1 from './FooterIllustrationsV1'

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 },
}))

export default function ForgotPasswordPage() {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ p: (theme) => `${theme.spacing(15.5, 7, 8)} !important` }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src='/logo/500x250-logotipo8.png'
              alt='Sistema Dedicado'
              width='500'
              height='250'
            />
          </Box>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2'>
              Informe seu e-mail e número de celular para que sua senha seja
              redefinida.
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              type='email'
              label='Email'
              sx={{ mb: 4 }}
            />
            <TextField
              autoFocus
              fullWidth
              id='phone'
              type='text'
              label='Ceular'
              sx={{ mb: 4 }}
            />
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ mb: 5.25 }}
            >
              Redefinir a Senha
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                component={Link}
                href='/auth'
                sx={{
                  display: 'flex',
                  '& svg': { mr: 1.5 },
                  alignItems: 'center',
                  color: 'secondary.main',
                  textDecoration: 'none',
                  justifyContent: 'center',
                }}
              >
                <Icon icon='mdi:chevron-left' fontSize='2rem' />
                <span>Autenticar-se </span>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ForgotPasswordPage.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
)
