'use client'

import { PageViewProps } from '@/layouts/types'
import { Container, Grid, Typography } from '@mui/material'

export default function AccountView(props: PageViewProps) {
  const {} = props

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant='body1'>Dashboard</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
