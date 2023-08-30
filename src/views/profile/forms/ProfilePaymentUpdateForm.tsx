import { Button, Grid } from '@mui/material'
import { ProfileProps } from '../types'

export default function ProfilePaymentUpdateForm(props: ProfileProps) {
  const { profile } = props

  return (
    <form noValidate autoComplete='off'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          creditCardNumber
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size='small'
            //type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 4 }}
          >
            Atualizar Cartão de Crédito
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
