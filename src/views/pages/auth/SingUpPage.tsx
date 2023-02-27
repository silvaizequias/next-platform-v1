import { MouseEvent, ReactNode } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

import Icon from 'src/@core/components/icon'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FooterIllustrationsV1 from './FooterIllustrationsV1'

import SignUpForm from './SignUpForm'

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}))

export default function SignUpPage() {
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ p: (theme) => `${theme.spacing(15.5, 7, 6.5)} !important` }}
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
              Você está prestes a ter o seu Sistema Dedicado!
            </Typography>
          </Box>
          <SignUpForm />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ mr: 2, color: 'text.secondary' }}>
              Já possui cadastro?
            </Typography>
            <Typography
              component={Link}
              href='/auth'
              sx={{ color: 'info.main', textDecoration: 'none' }}
            >
              Autentique-se
            </Typography>
          </Box>
          <Divider
            sx={{
              '& .MuiDivider-wrapper': { px: 4 },
              mt: (theme) => `${theme.spacing(5)} !important`,
              mb: (theme) => `${theme.spacing(7.5)} !important`,
            }}
          >
            ou
          </Divider>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              href='/'
              component={Link}
              sx={{ color: '#497ce2' }}
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            >
              <Icon icon='mdi:facebook' />
            </IconButton>
            <IconButton
              href='/'
              component={Link}
              sx={{ color: '#db4437' }}
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            >
              <Icon icon='mdi:google' />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

SignUpPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
