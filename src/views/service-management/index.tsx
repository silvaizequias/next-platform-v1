import { Grid } from '@mui/material'
import SessionHero from './sessions/SessionHero'

export default function ServiceManagementView() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SessionHero />
      </Grid>
    </Grid>
  )
}
