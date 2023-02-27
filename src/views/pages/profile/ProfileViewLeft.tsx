import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material'

import { useState } from 'react'

import { useSession } from 'next-auth/react'

import { useFetch } from 'src/hooks/useFetch'

import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { getInitials } from 'src/@core/utils/get-initials'

import { ThemeColor } from 'src/@core/layouts/types'

import { celularMask } from 'masks-br'

import EditProfileDialog from './EditProfileDialog'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  MASTER: 'success',
  ADMINISTRATOR: 'info',
  ANALYST: 'info',
  ASSISTANT: 'primary',
  CUSTOMER: 'primary',
  GUEST: 'warning'
}

const isActiveColor: ColorsType = {
  true: 'primary',
  false: 'secondary'
}

type Props = {
  id: string
}

const CardEdition = ({ id }: Props) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => {
    setOpenEdit(false)
  }

  return (
    <>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='contained'
          sx={{ mr: 2 }}
          onClick={handleEditClickOpen}
        >
          Editar
        </Button>
      </CardActions>

      <EditProfileDialog id={id} open={openEdit} onClose={handleEditClose} />
    </>
  )
}

export default function ProfileViewLeft() {
  const { data: session } = useSession()

  // @ts-ignore
  const userId = session?.user?.id

  // @ts-ignore
  const authorization = session?.user?.authorization
  const endpoint = process.env.NEXT_PUBLIC_MANAGER_API + '/users/' + userId
  const options = {
    headers: { Authorization: `Bearer ${authorization}` }
  }
  const { data: user } = useFetch(endpoint, options)

  return session ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{
              pt: 5,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            {user?.avatar?.length ? (
              <CustomAvatar
                src={user?.avatar || 'avatar.jpg'}
                variant='rounded'
                alt={user?.name || 'Usuário SD'}
                sx={{
                  width: 120,
                  height: 120,
                  fontWeight: 600,
                  mb: 4,
                  fontSize: '3rem'
                }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                variant='rounded'
                sx={{
                  width: 120,
                  height: 120,
                  fontWeight: 600,
                  mb: 4,
                  fontSize: '3rem'
                }}
              >
                {getInitials(user?.name || 'Usuário OpenClock')}
              </CustomAvatar>
            )}
            <Typography variant='h6' sx={{ mb: 2 }}>
              {user?.name || 'Usuário'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <CustomChip
                skin='light'
                size='small'
                label={(user?.role) || 'GUEST'}
                color={roleColors[user?.role || 'guest']}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </Box>
          </CardContent>

          <CardContent>
            <Divider sx={{ mt: (theme) => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                >
                  Usuário Desde:
                </Typography>
                <Typography variant='body2'>{new Date(user?.createdAt).toLocaleDateString()}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                >
                  Status:
                </Typography>
                <Typography variant='body2'>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={
                      (user?.isActive == true && 'Conta Ativa'.toUpperCase()) ||
                      (user?.isActive == false && 'Conta Inativa'.toUpperCase())
                    }
                    color={isActiveColor[user?.isActive]}
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography
                  variant='subtitle2'
                  sx={{ mr: 2, color: 'text.primary' }}
                >
                  E-mail:
                </Typography>
                <Typography variant='body2'>{user?.email || 'user@email.com'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                >
                  Celular:
                </Typography>
                <Typography variant='body2'>{celularMask(user?.phone) || celularMask('11987654321')}</Typography>
              </Box>
            </Box>
          </CardContent>

          <CardEdition id={user?.id} />
        </Card>
      </Grid>
    </Grid>
  ): null
}
