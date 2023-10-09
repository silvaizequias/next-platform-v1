import { Avatar, Card, CardContent, Typography } from '@mui/material'
import { ProfileProps } from './types'
import { grey } from '@mui/material/colors'

export default function ProfileLeftGrid(props: ProfileProps) {
  const { user } = props

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
          alt={user?.name!}
          src={user?.image! || '/avatar.png'}
          sx={{ width: 140, height: 140 }}
        />
      </CardContent>
      <CardContent>
        <Typography variant='h6'>{user?.name!}</Typography>
      </CardContent>
    </Card>
  )
}
