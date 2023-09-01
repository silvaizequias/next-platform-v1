'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Box, Container, Grid, Typography } from '@mui/material'
import { ContractType } from '../contracts/types'
import AccountContractView from './AccountContractView'
import { MdPayments, MdViewInAr } from 'react-icons/md'
import { blue } from '@mui/material/colors'
import AccountInvoicesDataGrid from './AccountInvoicesDataGrid'
import { InvoiceType } from '../invoices/types'
import { Fragment } from 'react'

export default function AccountView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: profile } = useFetch(`/api/profile/${user?.id}`)
  const { data } = useFetch(`/api/invoices`)
  const invoices = data?.filter((invoices: InvoiceType) => {
    if (
      invoices?.contract?.user?.id == profile?.id &&
      invoices?.status == 'PENDING'
    )
      return invoices
  })

  return (
    <Container maxWidth='xl'>
      {profile?.contracts.length! > 0 ? (
        <Grid container spacing={2} marginY={1}>
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
              <MdViewInAr />
              <Typography variant='h6' ml={2}>
                Minhas Contratações
              </Typography>
            </Box>
          </Grid>
          {profile?.contracts?.map((contract: ContractType) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={contract?.id}>
              <AccountContractView id={contract?.id} />
            </Grid>
          ))}

          {invoices?.length! > 0 && (
            <Fragment>
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
                    Faturas dos Serviços
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <AccountInvoicesDataGrid invoices={invoices!} />
              </Grid>
            </Fragment>
          )}
        </Grid>
      ) : (
        <Typography
          variant='h4'
          textAlign={'center'}
          marginY={4}
          color={blue[500]}
        >
          Você ainda não possui contratos!
        </Typography>
      )}
    </Container>
  )
}
