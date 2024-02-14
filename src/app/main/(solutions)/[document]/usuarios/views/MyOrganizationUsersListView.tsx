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
  Stack,
} from '@mui/material'
import { celularMask } from 'masks-br'
import dynamic from 'next/dynamic'

interface Props {
  data: OrganizationUsersType[] | any
}

const CreateMyOrganizationUserFormView = dynamic(
  () => import('./CreateMyOrganizationUserFormView'),
  {
    ssr: false,
  },
)

const UpdateMyOrganizationUserFormView = dynamic(
  () => import('./UpdateMyOrganizationUserFormView'),
  {
    ssr: false,
  },
)

export default function MyOrganizationUsersListView(props: Props) {
  const { data } = props
  const avatar = '/avatar.svg'

  return (
    <Card sx={{ width: '100%', maxWidth: 'md' }} component={'div'}>
      <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
        <CreateMyOrganizationUserFormView />
      </CardContent>
      <CardContent>
        <List dense sx={{ width: '100%' }}>
          {data?.map((myOrganization: OrganizationUsersType) => {
            return (
              <ListItem
                key={myOrganization?.id}
                secondaryAction={
                  <Stack>
                    <UpdateMyOrganizationUserFormView
                      userData={myOrganization}
                    />
                  </Stack>
                }
                disablePadding
              >
                <ListItemButton sx={{ borderRadius: 1 }}>
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
                      <Stack
                        gap={2}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Chip
                          label={myOrganization?.role}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                        <Typography variant="caption">
                          {celularMask(myOrganization?.user?.phone)}
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}
