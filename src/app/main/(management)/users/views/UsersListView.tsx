'use client'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { UserType } from '../types'
import { UsersColumnsView } from './UsersColumnsView'
import DialogButton from '@/components/DialogButton'
import CreateUserFormView from './CreateUserFormView'

interface Props {
  users: UserType | any
}

export default function UsersListView(props: Props) {
  const { users } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          paddingY: 2,
        }}
      >
        <DialogButton>
          <CreateUserFormView />
        </DialogButton>
      </Box>
      <DataGrid
        autoHeight
        getRowId={(user) => user?.id}
        rows={users}
        columns={UsersColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
