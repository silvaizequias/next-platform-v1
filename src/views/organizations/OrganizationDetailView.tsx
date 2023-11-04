'use client'

import { Container, Grid } from '@mui/material'
import { usePathname } from 'next/navigation'

export default function OrganizationDetailView() {
  const pathname = usePathname()

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={2} rowGap={2} paddingY={10}>
        <Grid item xs={12} sm={12} md={12}>{pathname}</Grid>
      </Grid>
    </Container>
  )
}
