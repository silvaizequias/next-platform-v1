import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function ServiceManagementPublicView() {
  return (
    <Container maxWidth='xl'>
      <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              mx: 'auto',
            }}
          >
            <Typography variant='h1'>Gestão de Serviços</Typography>
            <Divider sx={{ m: 4, px: 10, color: grey[50] }} />
            <Typography variant='button' textTransform={'uppercase'}>
              Solução inteligente para acompanhamento de demandas em tempo real,
              que aumentam a produtividade de pessoas e organizações
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
