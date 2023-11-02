import { Button, FormControl, TextField } from '@mui/material'

export default function AuthSignUpForm() {
  return (
    <form>
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField size="small" />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <TextField size="small" />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <TextField size="small" />
      </FormControl>
      <Button fullWidth size="small" variant="contained">
        Registrar
      </Button>
    </form>
  )
}
