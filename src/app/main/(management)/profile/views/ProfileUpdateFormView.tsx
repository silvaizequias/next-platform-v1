'user client'

import { Button, Grid, Stack, TextField } from '@mui/material'
import { UserType } from '../../users/types'

interface Props {
  profile: UserType | any
}

export default function ProfileUpdateFormView(props: Props) {
  const { profile } = props

  return (
    <Stack spacing={2} width={'100%'} component={'div'}>
      <Grid
        gap={1}
        sx={{ display: 'flex', justifyContent: 'center' }}
        container
        component={'form'}
      >
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="nome completo"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={3.9}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="documento"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={3.9}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="e-mail"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={3.9}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="celular"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="cep"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={9.8}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="logradouro"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            required
            label="complemento"
            autoFocus
          />
        </Grid>
      </Grid>
      <Button variant="contained">
        atualizar informações
      </Button>
    </Stack>
  )
}
