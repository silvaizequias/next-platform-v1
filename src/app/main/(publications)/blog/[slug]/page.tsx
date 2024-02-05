import { Metadata } from 'next'
import { actionGetSlugPublication } from './actions'
import { Grid, Stack, Typography, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  const { slug } = params
  const publication: any = await actionGetSlugPublication(slug)

  return {
    title: {
      default: publication,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default async function PublicationSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const publication: any = await actionGetSlugPublication(slug)

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
            paddingY: 4,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            align="center"
            fontWeight={600}
            color={blue[400]}
          >
            {publication}
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
