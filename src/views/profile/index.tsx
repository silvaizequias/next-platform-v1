import { Container, Grid } from '@mui/material'
import ProfileRightGrid from './ProfileRightGrid'
import ProfileLeftGrid from './ProfileLeftGrid'

export default function ProfileView() {
  return (
    <Container maxWidth='xl'>
      <Grid container columnSpacing={2} rowGap={2} paddingY={10}>
        <Grid item xs={12} sm={12} md={4}>
          <ProfileLeftGrid />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <ProfileRightGrid />
        </Grid>
      </Grid>
    </Container>
  )
}
