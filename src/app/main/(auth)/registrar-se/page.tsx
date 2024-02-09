import { Container, Box, Stack, Typography, Link } from '@mui/material'
import { Metadata } from 'next'
import SignUpFormView from './views/SignUpFormView'
import { blue } from '@mui/material/colors'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    default: 'registrar-se na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function SignUpPage() {
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
        <SignUpFormView />
        <Link
          href={'/autenticar-se'}
          underline="none"
          variant="caption"
          fontWeight={200}
        >
          já sou registrado
        </Link>
      </Box>
    </Container>
  ) : (
    redirect('/')
  )
}
