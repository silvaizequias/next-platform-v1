import { Card, CardContent, Typography } from '@mui/material'
import { ProfileProps } from './types'
import { blue, grey } from '@mui/material/colors'
import ProfilePasswordUpdateForm from './forms/ProfilePasswordUpdateForm'

export default function ProfilePasswordUpdate(props: ProfileProps) {
  const { profile } = props

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color={blue[800]}>
          Atualizar Senha
        </Typography>
        <Typography variant='body2' color={grey[400]}>
          Nós recomendamos atualizar sua senha peridicamente!
        </Typography>
      </CardContent>
      <CardContent>
        <ProfilePasswordUpdateForm profile={profile} />
      </CardContent>
    </Card>
  )
}
