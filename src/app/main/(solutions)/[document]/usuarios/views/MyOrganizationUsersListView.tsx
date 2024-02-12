'use client'

import { OrganizationUsersType } from '@/app/main/(management)/organizations/users/types'
import {
  List,
  ListItem,
  Chip,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  colors,
  Fab,
  Tooltip,
} from '@mui/material'
import { celularMask } from 'masks-br'
import { Fragment, useCallback, useState } from 'react'
import CreateMyOrganizationUserFormView from './CreateMyOrganizationUserFormView'
import UpdateMyOrganizationUserFormView from './UpdateMyOrganizationUserFormView'
import { Add } from '@mui/icons-material'

interface Props {
  data: OrganizationUsersType[] | any
}

export default function MyOrganizationUsersListView(props: Props) {
  const { data } = props
  const avatar = '/avatar.svg'

  const [createUser, setCreateUser] = useState<boolean>(false)
  const handleCreateUser = useCallback(() => {
    setCreateUser(!createUser)
  }, [createUser])

  const [userData, setUserData] = useState<OrganizationUsersType | any>(null)
  const [updateUser, setUpdateUser] = useState<boolean>(false)
  const handleUpdateUser = useCallback(
    (data: OrganizationUsersType) => {
      data && setUserData(data)
      setUpdateUser(!updateUser)
    },
    [updateUser],
  )
  const handleUpdateUserClose = useCallback(() => {
    setUpdateUser(!updateUser)
  }, [updateUser])

  return (
    <Fragment>
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
          <Tooltip title={'adicionar'} onClick={handleCreateUser}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </CardContent>
        <CardContent>
          <List dense sx={{ width: '100%' }}>
            {data?.map((myOrganization: OrganizationUsersType) => {
              return (
                <ListItem
                  key={myOrganization?.id}
                  onClick={() => handleUpdateUser(myOrganization)}
                  secondaryAction={
                    <Chip
                      label={myOrganization?.role}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={myOrganization?.user?.name}
                        src={myOrganization?.user?.image || avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          sx={{ textTransform: 'lowercase' }}
                        >
                          {myOrganization?.user?.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption">
                          {celularMask(myOrganization?.user?.phone)}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Card>
      <Dialog
        open={createUser}
        keepMounted
        onClose={handleCreateUser}
        maxWidth={'xs'}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: colors.blue[400],
            textTransform: 'lowercase',
          }}
        >
          {'dedicado'}
        </DialogTitle>
        <DialogContent>
          <CreateMyOrganizationUserFormView onClose={handleCreateUser} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={updateUser}
        keepMounted
        onClose={handleUpdateUserClose}
        maxWidth={'xs'}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: colors.blue[400],
            textTransform: 'lowercase',
          }}
        >
          {`atualizar ${userData?.user?.name}`}
        </DialogTitle>
        <DialogContent>
          <UpdateMyOrganizationUserFormView
            userData={userData}
            onClose={handleUpdateUserClose}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
