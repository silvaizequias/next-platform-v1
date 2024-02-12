'use client'

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  colors,
} from '@mui/material'
import { OrganizationUsersType } from '../types'
import { DataGrid } from '@mui/x-data-grid'
import { OrganizationUsersColumnsView } from './OrganizationUsersColumnsView'
import CreateOrganizationUserFormView from './CreateOrganizationUserFormView'
import { useState, useCallback, Fragment } from 'react'
import { Add } from '@mui/icons-material'

interface Props {
  organizationUsers: OrganizationUsersType[] | any
}

export default function OrganizationUsersListView(props: Props) {
  const { organizationUsers } = props

  const [createUser, setCreateUser] = useState<boolean>(false)
  const handleCreateUser = useCallback(() => {
    setCreateUser(!createUser)
  }, [createUser])

  return (
    <Fragment>
      <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            paddingY: 2,
          }}
        >
          <Tooltip title={'adicionar'} onClick={handleCreateUser}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </Box>
        <DataGrid
          autoHeight
          getRowId={(organizationUser) => organizationUser?.id}
          rows={organizationUsers}
          columns={OrganizationUsersColumnsView}
          disableColumnSelector
        />
      </Box>
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
          <CreateOrganizationUserFormView onClose={handleCreateUser} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
