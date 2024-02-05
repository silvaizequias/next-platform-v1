import { Grid, Stack, Typography, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'conteúdo inteligente do mundo da tecnologia',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function BlogPage() {
  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          minHeight: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: 4
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            fontWeight={600}
            color={blue[400]}
          >
            blog dedicado
          </Typography>
          <Typography
            component="h4"
            variant="h6"
            align="center"
            fontWeight={200}
          >
            conteúdo inteligente do mundo da tecnologia
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        square
        sx={{ height: '100vh' }}
      ></Grid>
    </Grid>
  )
}
