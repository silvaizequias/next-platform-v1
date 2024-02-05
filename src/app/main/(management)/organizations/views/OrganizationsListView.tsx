'use client'

import { Box } from '@mui/material'
import { OrganizationType } from '../types'
import { DataGrid } from '@mui/x-data-grid'
import { OrganizationColumnsView } from './OrganizationColumnsView'

interface Props {
  organizations: OrganizationType[] | any
}

export default function OrganizationListView(props: Props) {
  const { organizations } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(organization) => organization?.id}
        rows={organizations}
        columns={OrganizationColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
