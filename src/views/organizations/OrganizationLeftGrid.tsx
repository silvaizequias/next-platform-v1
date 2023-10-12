import { Avatar, Card, CardContent, Typography } from '@mui/material'
import { OrganizationProps } from './types'
import { grey } from '@mui/material/colors'

export default function OrganizationLeftGrid(props: OrganizationProps) {
  const { organization } = props

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        textAlign: 'center',
        bgcolor: 'transparent',
        color: grey[50],
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt={organization?.name!}
          src={organization?.image! || '/logotipo5.png'}
          sx={{ width: 140, height: 140 }}
        />
      </CardContent>
      <CardContent>
        <Typography variant='h6'>{organization?.name!}</Typography>
        <Typography variant='button' fontWeight={200}>
          {organization?.cnpj!}
        </Typography>
      </CardContent>
    </Card>
  )
}
