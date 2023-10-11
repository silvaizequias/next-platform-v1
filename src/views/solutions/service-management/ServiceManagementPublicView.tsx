import {
  Container,
  Grid,
} from '@mui/material'
import HeaderPublicView from './HeaderPublicView'

export default function ServiceManagementPublicView() {
  return (
    <Container maxWidth='xl'>
      <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
        <Grid item xs={12} sm={12}>
          <HeaderPublicView />
        </Grid>
      </Grid>
    </Container>
  )
}
