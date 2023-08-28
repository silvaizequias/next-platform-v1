import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { ProfileProps } from './types'
import ShowInDialog from '@/components/ShowInDialog'
import ProfileImageUploadForm from './forms/ProfileImageUploadForm'
import { useState } from 'react'
import { MdWifiProtectedSetup } from 'react-icons/md'
import { blue } from '@mui/material/colors'

export default function ProfileLeftView(props: ProfileProps) {
  const { profile } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Card>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Badge
          overlap='rectangular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Tooltip title='Atualizar Imagem'>
              <IconButton
                sx={{ p: 0, color: blue[500], fontSize: 36 }}
                onClick={handleDialog}
              >
                <MdWifiProtectedSetup />
              </IconButton>
            </Tooltip>
          }
        >
          <CardMedia
            component='img'
            height='200'
            alt={profile?.name}
            image={profile?.avatar || '/avatar.png'}
          />
        </Badge>

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {profile?.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {profile?.email}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {profile?.phone}
          </Typography>
        </CardContent>

        <ShowInDialog
          onClose={handleDialog}
          open={openDialog}
          title='Atualizar Imagem do Perfil'
        >
          <ProfileImageUploadForm onClose={handleDialog} profile={profile} />
        </ShowInDialog>
      </Card>
    </Card>
  )
}
