'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { InvoiceType } from '../invoices/types'
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { Suspense } from 'react'
import InvoiceHistoryDataGrid from './InvoiceHistoryDataGrid'
import { blue } from '@mui/material/colors'
import { MdPayments } from 'react-icons/md'

export default function InvoiceHistoryView(props: SessionProps) {
  const { user }: any = props?.session?.user!
  const { data: profile } = useFetch(`/api/profile/${user?.id!}`)
  const { data } = useFetch(`/api/invoices`)
  const invoices = data?.filter((invoices: InvoiceType) => {
    if (invoices?.contract?.user?.id == profile?.id) return invoices
  })

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 28,
              color: blue[500],
              textTransform: 'uppercase',
            }}
          >
            <MdPayments />
            <Typography variant='h6' ml={2}>
              Histórico de Faturas dos Serviços
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Suspense fallback={'... carregando dados!'}>
                <InvoiceHistoryDataGrid invoices={invoices!} />
              </Suspense>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
