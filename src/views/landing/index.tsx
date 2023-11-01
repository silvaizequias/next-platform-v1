import { Grid } from '@mui/material'
import SessionHero from './sessions/SessionHero'

export default function LandingView() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SessionHero />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  )
}
