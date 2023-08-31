import { Box, Card, Chip, Grid, Typography } from '@mui/material'
import { AccountContractDetailProps } from './types'
import { grey } from '@mui/material/colors'

export default function AccountContractDetail(
  props: AccountContractDetailProps,
) {
  const { contract } = props

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='subtitle1' textAlign={'center'} paddingBottom={2}>
          {contract?.service?.description}
        </Typography>
      </Grid>

      <Card sx={{ p: 2, bgcolor: grey[200] }}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle1' marginRight={1}>
            Contratado em:
          </Typography>
          <Typography variant='subtitle2'>
            {new Date(contract?.createdAt).toLocaleString()}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle1' marginRight={1}>
            Período do Serviço:
          </Typography>
          <Typography variant='subtitle2'>{contract?.period}</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle1' marginRight={1}>
            Valor do Serviço:
          </Typography>
          <Typography variant='subtitle2'>
            {contract?.service?.price}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle1' marginRight={1}>
            Status:
          </Typography>
          <Typography variant='subtitle2'>{contract?.status}</Typography>
        </Grid>
      </Card>
    </Grid>
  )
}
