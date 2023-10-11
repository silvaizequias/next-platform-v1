'use client'

import { PageViewProps } from '@/layouts/types'
import { Container, Grid } from '@mui/material'
import TabsPrivateView from './tabs'

export default function ServiceManagementPrivateView(props: PageViewProps) {
  const {} = props

  return (
    <Container maxWidth='xl'>
      <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
        <Grid item xs={12} sm={12}>
          <TabsPrivateView />
        </Grid>
      </Grid>
    </Container>
  )
}
