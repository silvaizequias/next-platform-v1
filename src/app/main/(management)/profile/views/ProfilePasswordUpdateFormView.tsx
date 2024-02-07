'user client'

import { Button, Grid, Stack, TextField } from '@mui/material'
import { UserType } from '../../users/types'

interface Props {
  profile: UserType | any
}

export default function ProfilePasswordUpdateFormView(props: Props) {
  const { profile } = props

  return (
    <Stack spacing={2} width={'100%'} component={'div'}>
      <Grid
        gap={1}
        sx={{ display: 'flex', justifyContent: 'center' }}
        container
        component={'form'}
      >
        <Grid item xs={12} sm={3.9}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="senha atual"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={3.9}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="nova senha"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={3.9}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="confirmar nova senha"
            autoFocus
          />
        </Grid>
      </Grid>
      <Button variant="contained">atualizar senha</Button>
    </Stack>
  )
}
