'use client'

import { Grid, Typography } from '@mui/material'

export default function AccountView() {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant='body1'>Account</Typography>
      </Grid>
    </Grid>
  )
}
