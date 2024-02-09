import { Box, Container, Link, Stack, Typography } from '@mui/material'
import { Metadata } from 'next'
import SignInFormView from './views/SignInFormView'
import { blue } from '@mui/material/colors'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    default: 'autenticar-se na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function SignInPage() {
  const session = await getServerSession(nextAuthOptions)

  return !session ? (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Stack
          spacing={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            fontWeight={600}
            color={blue[400]}
          >
            dedicado
          </Typography>
          <Typography
            component="h4"
            variant="h6"
            align="center"
            fontWeight={200}
          >
            sua melhor plataforma de serviços
          </Typography>
        </Stack>
        <SignInFormView />
        <Stack
          width={'100%'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href={'/redefinir-senha'}
            underline="none"
            variant="caption"
            fontWeight={200}
          >
            esqueci a senha
          </Link>
          <Link
            href={'/registrar-se'}
            underline="none"
            variant="caption"
            fontWeight={200}
          >
            não sou registrado
          </Link>
        </Stack>
      </Box>
    </Container>
  ) : (
    redirect('/')
  )
}
