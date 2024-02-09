import { Box, Container, Link, Stack, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Container
      maxWidth={'md'}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', sm: 'space-between' },
          alignItems: 'center',
          paddingY: { xs: 2, sm: 4 },
          width: '100%',
          gap: 2,
        }}
      >
        <Stack sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Link
            href="https://dedicado.digital"
            underline="none"
            variant="h6"
            textTransform={'lowercase'}
          >
            dedicado
          </Link>
          <Typography variant="caption" textTransform={'lowercase'}>
            {'© '} 2023 - {new Date().getFullYear()} | 52.378.516/0001-78
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            textTransform={'lowercase'}
          >
            todos os direitos reservados
          </Typography>
        </Stack>
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
          }}
        >
          <Link
            href="/termos-e-politicas"
            underline="none"
            variant="caption"
            textTransform={'lowercase'}
          >
            termos e políticas
          </Link>
        </Stack>
      </Box>
    </Container>
  )
}
