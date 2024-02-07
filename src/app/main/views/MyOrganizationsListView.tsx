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
  Card,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material'
import { OrganizationUsersType } from '../(management)/organizations/users/types'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import DialogButton from '@/components/DialogButton'
import CreateMyOrganizationFormView from './CreateMyOrganizationFormView'

interface Props {
  data: OrganizationUsersType[] | any
}
export default function MyOrganizationsListView(props: Props) {
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
    <Card sx={{ width: '100%', maxWidth: 'md' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
        <DialogButton>
          <CreateMyOrganizationFormView />
        </DialogButton>
      </CardContent>
      <CardContent>
        <List dense sx={{ width: '100%' }}>
          {data?.map((myOrganization: OrganizationUsersType) => {
            return (
              <ListItem
                onClick={() =>
                  handleClick(myOrganization?.organization?.document)
                }
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
                      <Typography
                        variant="h6"
                        sx={{ textTransform: 'lowercase' }}
                      >
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
      </CardContent>
    </Card>
  )
}
