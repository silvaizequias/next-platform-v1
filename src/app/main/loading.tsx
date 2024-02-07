import {
  Container,
  Box,
  Stack,
  Typography,
} from '@mui/material'

export default function Loading() {
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
          <Typography
            component="h4"
            variant="h6"
            align="center"
            fontWeight={200}
          >
            ...carregando
          </Typography>
        </Stack>
      </Box>
    </Container>
  )
}
