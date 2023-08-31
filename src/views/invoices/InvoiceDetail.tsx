import { useFetch } from '@/hooks/useFetch'
import { InvoiceDetailProps, InvoiceType } from './types'
import { Card, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

interface Props {
  id: string
}

export default function InvoiceDetail({ id }: Props) {
  const { data: invoice } = useFetch<InvoiceType>(`/api/invoices/${id}`)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='subtitle1' textAlign={'center'} paddingBottom={2}>
          {`${invoice?.invoiceCode} - ${invoice?.contract?.service?.name}`}
        </Typography>
      </Grid>

      <Card sx={{ p: 2, bgcolor: grey[200] }}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle1' marginRight={1}>
            Status:
          </Typography>
          <Typography variant='subtitle2'>{invoice?.status}</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle1' marginRight={1}>
            Valor:
          </Typography>
          <Typography variant='subtitle2'>{invoice?.amount}</Typography>
        </Grid>
      </Card>
    </Grid>
  )
}
