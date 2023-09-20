import { PageViewProps } from '@/types'
import { Container, Grid } from '@mui/material'

export default function ServiceManagementPrivateView(props: PageViewProps) {
  const { session, metadata } = props

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={2}></Grid>
    </Container>
  )
}
