import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { ProfileProps } from './types'
import { blue, grey } from '@mui/material/colors'
import ProfileAddressUpdateForm from './forms/ProfileAddressUpdateForm'

export default function ProfileAddressUpdate(props: ProfileProps) {
  const { profile } = props

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color={blue[800]}>
          Atualizar Endereço
        </Typography>
        <Typography variant='body2' color={grey[400]}>
          Mantenha suas informações atualizadas. Sempre estarão seguras conosco!
        </Typography>
      </CardContent>
      <CardContent>
        <ProfileAddressUpdateForm profile={profile} />
      </CardContent>
    </Card>
  )
}
