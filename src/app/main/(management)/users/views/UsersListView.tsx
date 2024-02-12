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
import { DataGrid } from '@mui/x-data-grid'
import { UserType } from '../types'
import { UsersColumnsView } from './UsersColumnsView'
import CreateUserFormView from './CreateUserFormView'
import { useState, useCallback, Fragment } from 'react'
import { Add } from '@mui/icons-material'

interface Props {
  users: UserType | any
}

export default function UsersListView(props: Props) {
  const { users } = props

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
          getRowId={(user) => user?.id}
          rows={users}
          columns={UsersColumnsView}
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
          <CreateUserFormView onClose={handleCreateUser} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
