import { Grid, Card, CardHeader, CardContent, Typography } from '@mui/material'

export default function IndexPage() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title=''></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}></Typography>
            <Typography></Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
