import { ReactNode } from 'react'

import {
  Box,
  CardContent,
  Divider,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

import { MouseEvent } from 'react'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import Icon from 'src/@core/components/icon'

import FooterIllustrationsV1 from './FooterIllustrationsV1'

import SignInForm from './SignInForm'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 },
}))

export default function SignInPage() {
  const systemName = process.env.NEXT_PUBLIC_SYSTEM_NAME as string

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ p: (theme) => `${theme.spacing(13, 7, 6.5)} !important` }}
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
              Informe suas credenciais para acessar o {systemName.toLowerCase()}
            </Typography>
          </Box>
          <SignInForm />
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

SignInPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
