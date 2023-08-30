import { Card, CardContent, Typography } from '@mui/material'
import { ProfileProps } from './types'
import { blue, grey } from '@mui/material/colors'
import ProfilePaymentUpdateForm from './forms/ProfilePaymentUpdateForm'

export default function ProfilePaymentUpdate(props: ProfileProps) {
  const { profile } = props

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color={blue[800]}>
          Pagamentos
        </Typography>
        <Typography variant='body2' color={grey[400]}>
          Essas informações são importantes para manter a recorrência dos
          serviços na plataforma!
        </Typography>
      </CardContent>
      <CardContent>
        <ProfilePaymentUpdateForm profile={profile} />
      </CardContent>
    </Card>
  )
}
