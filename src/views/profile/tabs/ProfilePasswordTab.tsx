import { Alert, AlertTitle, Box } from '@mui/material'
import { ProfileProps } from '../types'
import ProfilePasswordUpdateForm from '../forms/ProfilePasswordUpdateForm'
import ProfilePasswordSettingForm from '../forms/ProfilePasswordSettingForm'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'

export default function ProfilePasswordTab(props: ProfileProps) {
  const { user } = props

  return (
    <Box>
      <Alert icon={false} severity='warning' sx={{ mb: 2 }}>
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
      <Suspense fallback={<Spinner />}>
        {user?.passHash == null ? (
          <ProfilePasswordSettingForm user={user!} />
        ) : (
          <ProfilePasswordUpdateForm user={user!} />
        )}
      </Suspense>
    </Box>
  )
}
