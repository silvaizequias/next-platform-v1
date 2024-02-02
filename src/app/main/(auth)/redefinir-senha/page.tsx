import { Metadata } from 'next'
import ResetPasswordFormView from './views/ResetPasswordFormView'
import { Container, Box, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    default: 'redefinir a senha na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function ResetPasswordPage() {
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
        <ResetPasswordFormView />
      </Box>
    </Container>
  ) : (
    redirect('/')
  )
}
