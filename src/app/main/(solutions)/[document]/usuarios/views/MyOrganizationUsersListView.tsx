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
} from '@mui/material'

interface Props {
  data: OrganizationUsersType[] | any
}

export default function MyOrganizationUsersListView(props: Props) {
  const { data } = props
  const avatar = '/avatar.svg'

  return (
    <List
      dense
      sx={{ width: '100%', maxWidth: 'md', bgcolor: 'background.paper' }}
    >
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
                  <Typography variant="h6" sx={{ textTransform: 'lowercase' }}>
                    {myOrganization?.user?.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">
                    {myOrganization?.user?.phone}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
