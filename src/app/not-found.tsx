import { Box, Container, Grid, Link, Typography } from '@mui/material'

export default function NotFound() {
  return (
    <Grid container spacing={2} marginY={10}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              paddingY: 25,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            <Typography variant="h2">Ops!</Typography>
            <Typography variant="body2">
              Esse conteudo nao existe ou foi movido daqui...
            </Typography>
            <Link sx={{ fontSize: 12, textDecoration: 'none' }} href="/">
              Retornar ao inicio
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
