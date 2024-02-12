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
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  Dialog,
  colors,
  Tooltip,
  Fab,
} from '@mui/material'
import { OrganizationUsersType } from '../(management)/organizations/users/types'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import CreateMyOrganizationFormView from './CreateMyOrganizationFormView'
import { cnpjMask } from 'masks-br'
import { Session } from 'next-auth'
import { Add } from '@mui/icons-material'

interface Props {
  data: OrganizationUsersType[] | any
  session: Session
}
export default function MyOrganizationsListView(props: Props) {
  const { data, session } = props
  const logotipo = '/logotipo.svg'

  const [createOrganization, setCreateOrganization] = useState<boolean>(false)
  const handleCreateOrganization = useCallback(() => {
    setCreateOrganization(!createOrganization)
  }, [createOrganization])

  const router = useRouter()
  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  return (
    <Fragment>
      <Card sx={{ width: '100%', maxWidth: 'md' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
          <Tooltip title={'adicionar'} onClick={handleCreateOrganization}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </CardContent>
        <CardContent>
          <List dense sx={{ width: '100%' }}>
            {data?.map((myOrganization: OrganizationUsersType) => {
              return (
                myOrganization?.active &&
                myOrganization.role !== 'client' && (
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
                            {cnpjMask(myOrganization?.organization?.document)}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )
            })}
          </List>
        </CardContent>
      </Card>
      <Dialog
        open={createOrganization}
        keepMounted
        onClose={handleCreateOrganization}
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
          <CreateMyOrganizationFormView onClose={handleCreateOrganization} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
