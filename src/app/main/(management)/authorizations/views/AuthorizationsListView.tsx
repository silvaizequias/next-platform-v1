'use client'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { OrganizationKeyType } from '../types'
import { AuthorizationsColumnsView } from './AuthorizationsColumnsView'

interface Props {
  authorizations: OrganizationKeyType[] | any
}

export default function AuthorizationsListView(props: Props) {
  const { authorizations } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(authorization) => authorization?.id}
        rows={authorizations}
        columns={AuthorizationsColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
