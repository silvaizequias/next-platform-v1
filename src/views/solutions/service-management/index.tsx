import { PageViewProps } from '@/layouts/types'
import { Container, Grid, Typography } from '@mui/material'

export default function ServiceManagementPrivateView(props: PageViewProps) {
  const {} = props

  return (
    <Container maxWidth='xl'>
      <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant='body1'>Service Manager Private View</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
