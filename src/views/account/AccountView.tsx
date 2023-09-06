'use client'

import { SessionProps } from '@/types'
import { Container, Grid } from '@mui/material'

export default function AccountView(props: SessionProps) {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} sm={12}></Grid>
      </Grid>
    </Container>
  )
}
