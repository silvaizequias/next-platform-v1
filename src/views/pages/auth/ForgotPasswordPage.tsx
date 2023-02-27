import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FooterIllustrationsV1 from './FooterIllustrationsV1'
import ForgotPasswordForm from './ForgotPasswordForm'

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 },
}))

export default function ForgotPasswordPage() {

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
          <ForgotPasswordForm />
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ForgotPasswordPage.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
)
