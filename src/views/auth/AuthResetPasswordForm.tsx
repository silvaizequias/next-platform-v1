import { Button, FormControl, TextField } from '@mui/material'

export default function AuthResetPasswordForm() {
  return (
    <form>
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField size="small" />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <TextField size="small" />
      </FormControl>
      <Button fullWidth size="small" variant="contained">
        Redefinir Senha
      </Button>
    </form>
  )
}
