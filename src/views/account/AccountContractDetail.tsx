import { Box, Chip, Grid, Typography } from '@mui/material'
import { AccountContractDetailProps } from './types'

export default function AccountContractDetail(
  props: AccountContractDetailProps,
) {
  const { contract } = props

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
        >
          <Typography variant='subtitle1'>Criado em:</Typography>
          <Typography variant='subtitle2'>
            {new Date(contract?.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
        >
          <Typography variant='subtitle1'>Status:</Typography>
          {(contract?.status == 'ACTIVE' && (
            <Chip
              label={'ATIVO'}
              sx={{ bgcolor: 'green' }}
              variant='outlined'
            />
          )) ||
            (contract?.status == 'SUSPENDED' && (
              <Chip
                label={'SUSPENSO'}
                sx={{ bgColor: 'gray' }}
                variant='outlined'
              />
            )) ||
            (contract?.status == 'FINISHED' && (
              <Chip
                label={'FINALIZADO'}
                sx={{ bgColor: 'gray' }}
                variant='outlined'
              />
            )) ||
            (contract?.status == 'CANCELED' && (
              <Chip
                label={'CANCELADO'}
                sx={{ bgColor: 'red' }}
                variant='outlined'
              />
            ))}
        </Box>
      </Grid>
    </Grid>
  )
}
