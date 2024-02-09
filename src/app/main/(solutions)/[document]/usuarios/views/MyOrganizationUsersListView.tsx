import { OrganizationUsersType } from '@/app/main/(management)/organizations/users/types'
import DialogButton from '@/components/DialogButton'
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
} from '@mui/material'
import { celularMask } from 'masks-br'
import { Fragment } from 'react'
import CreateMyOrganizationUserFormView from './CreateMyOrganizationUserFormView'

interface Props {
  data: OrganizationUsersType[] | any
}

export default function MyOrganizationUsersListView(props: Props) {
  const { data } = props
  const avatar = '/avatar.svg'

  return (
    <Fragment>
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
          <DialogButton>
            <CreateMyOrganizationUserFormView />
          </DialogButton>
        </CardContent>
        <CardContent>
          <List dense sx={{ width: '100%' }}>
            {data?.map((myOrganization: OrganizationUsersType) => {
              return (
                <ListItem
                  key={myOrganization?.id}
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
    </Fragment>
  )
}
