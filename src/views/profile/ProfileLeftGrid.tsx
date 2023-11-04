'use client'

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { useRouter } from 'next/navigation'

export default function ProfileLeftGrid() {
  const router = useRouter()

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        textAlign: 'center',
        bgcolor: 'transparent',
        color: blue[400],
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt={'nome'}
          src={'/logotipo5.png'}
          sx={{ width: 140, height: 140 }}
        />
      </CardContent>
      <CardContent>
        <Typography variant="h6" textTransform={'uppercase'}>
          {'nome'}
        </Typography>
        <Typography variant="body2" textTransform={'uppercase'}>
          {'perfil'}
        </Typography>
      </CardContent>
      <CardActionArea
        sx={{
          bgcolor: 'white',
          border: 1,
          borderColor: 'whitesmoke',
          paddingY: 2,
        }}
        onClick={() => router.push(`organizacoes/${1}`)}
      >
        <Typography variant="h6" textTransform={'uppercase'}>
          {'organização'}
        </Typography>
        <Typography variant="body2" textTransform={'uppercase'}>
          {'função'}
        </Typography>
      </CardActionArea>
    </Card>
  )
}
