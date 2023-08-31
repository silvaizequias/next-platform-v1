'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Box, Container, Grid, Typography } from '@mui/material'
import { ContractType } from '../contracts/types'
import AccountContractView from './AccountContractView'
import { MdPayments, MdViewInAr } from 'react-icons/md'
import { blue } from '@mui/material/colors'
import AccountInvoicesDataGrid from './AccountInvoicesDataGrid'

export default function AccountView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: profile, error, mutate } = useFetch(`/api/profile/${user?.id}`)

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
              <Typography variant='h5' ml={2}>
                Meus Contratos
              </Typography>
            </Box>
          </Grid>
          {profile?.contracts?.map((contract: ContractType) => (
            <Grid item xs={12} sm={4} key={contract?.id}>
              <AccountContractView id={contract?.id} />
            </Grid>
          ))}
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
              <Typography variant='h5' ml={2}>
                Meus Pagamentos
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <AccountInvoicesDataGrid profile={profile!} />
          </Grid>
        </Grid>
      ) : (
        <Typography variant='h4' textAlign={'center'} marginY={4} color={blue[500]}>
          Você ainda não possui contratos!
        </Typography>
      )}
    </Container>
  )
}
