import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { ProfileProps } from './types'
import ShowInDialog from '@/components/ShowInDialog'
import ProfileImageUploadForm from './forms/ProfileImageUploadForm'
import { useState } from 'react'
import { MdWifiProtectedSetup } from 'react-icons/md'
import { blue, grey } from '@mui/material/colors'

export default function ProfileLeftView(props: ProfileProps) {
  const { profile } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent>
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
              image={profile?.image || '/avatar.png'}
            />
          </Badge>
        </CardContent>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h6' color={blue[800]}>
            {profile?.name}
          </Typography>
          <Typography variant='body2' color={grey[400]}>
            {profile?.email}
          </Typography>
          <Typography variant='body2' color={grey[400]}>
            {profile?.phone}
          </Typography>
          <Chip
            label={profile?.role}
            color='success'
            variant='outlined'
            sx={{ marginTop: 2 }}
          />
        </CardContent>

        <ShowInDialog
          onClose={handleDialog}
          open={openDialog}
          title='Atualizar Imagem do Perfil'
        >
          <ProfileImageUploadForm onClose={handleDialog} profile={profile} />
        </ShowInDialog>
      </Card>
    </Box>
  )
}
