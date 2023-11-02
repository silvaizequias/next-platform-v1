import { Alert, AlertTitle, Box } from '@mui/material'
import ProfilePasswordUpdateForm from '../forms/ProfilePasswordUpdateForm'

export default function ProfilePasswordTab() {
  return (
    <Box>
      <Alert icon={false} severity="warning" sx={{ mb: 2 }}>
        <AlertTitle
          sx={{
            fontWeight: 600,
            textTransform: 'uppercase',
            mb: (theme) => `${theme.spacing(1)} !important`,
          }}
        >
          Certifique de que todos os requisitos de segurança serão atendidos!
        </AlertTitle>
        - Mínimo 8 caracteres; <br />
        - Pelo menos uma letra maiúscula; <br />
        - Pelo menos um caractere especial; <br />- Pelo menos um número.
      </Alert>
      <ProfilePasswordUpdateForm />
    </Box>
  )
}
