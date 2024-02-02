import { Container, Box, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Image from 'next/image'

export default function LandingPageView() {
  const logotipo = '/logotipo.svg'

  return (
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
          <Image
            src={logotipo}
            alt={'dedicado'}
            priority
            width={179}
            height={259}
          />
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
      </Box>
    </Container>
  )
}
