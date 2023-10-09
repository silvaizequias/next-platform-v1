import { Alert, AlertTitle, Box, Typography } from '@mui/material'
import { ProfileProps } from '../types'
import ProfileInformationUpdateForm from '../forms/ProfileInformationUpdateForm'

export default function ProfileInformationTab(props: ProfileProps) {
  const { user } = props

  return (
    <Box>
      <Alert icon={false} severity='info' sx={{ mb: 2 }}>
        <AlertTitle
          sx={{
            fontWeight: 600,
            textTransform: 'uppercase',
            mb: (theme) => `${theme.spacing(1)} !important`,
          }}
        >
          Suas informações sempre estarão seguras conosco!
        </AlertTitle>
        <Typography variant='button'>
          Tratamos as informações de nossos clientes com absoluto sigilo,
          seguindo todas as normas de LGPD.
        </Typography>
      </Alert>
      <ProfileInformationUpdateForm user={user!} />
    </Box>
  )
}
