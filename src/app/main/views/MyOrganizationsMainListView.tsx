'use client'

import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Chip,
  colors,
} from '@mui/material'
import { OrganizationUsersType } from '../(management)/organizations/users/types'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface Props {
  data: OrganizationUsersType[] | any
}
export default function MyOrganizationsMainListView(props: Props) {
  const { data } = props
  const logotipo = '/logotipo.svg'

  const router = useRouter()
  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  return (
    <List
      dense
      sx={{ width: '100%', maxWidth: 'sm', bgcolor: 'background.paper' }}
    >
      {data?.map((myOrganization: OrganizationUsersType) => {
        return (
          <ListItem
          onClick={() => handleClick(myOrganization?.organization?.document)}
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
                  alt={myOrganization?.organization?.name}
                  src={myOrganization?.organization?.image || logotipo}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ textTransform: 'lowercase' }}>
                    {myOrganization?.organization?.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">
                    {myOrganization?.organization?.document}
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
