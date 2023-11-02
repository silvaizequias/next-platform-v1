import HeadLook from '@/components/head-look'
import { Grid } from '@mui/material'

export default function ServiceManagementView() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HeadLook
          title="Gestão de Serviços"
          subtitle="Acompanhamento das demandas de serviço em tempo real"
        />
      </Grid>
    </Grid>
  )
}
