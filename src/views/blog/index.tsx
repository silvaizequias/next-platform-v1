import HeadLook from '@/components/head-look'
import { Grid } from '@mui/material'

export default function BlogView() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HeadLook
          title="Blog"
          subtitle="Conteúdo inteligente"
        />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  )
}
