'use client'

import { Box } from '@mui/material'
import { OrganizationUsersType } from '../types'
import { DataGrid } from '@mui/x-data-grid'
import { OrganizationUsersColumnsView } from './OrganizationUsersColumnsView'

interface Props {
  organizationUsers: OrganizationUsersType[] | any
}

export default function OrganizationUsersListView(props: Props) {
  const { organizationUsers } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(organizationUser) => organizationUser?.id}
        rows={organizationUsers}
        columns={OrganizationUsersColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
