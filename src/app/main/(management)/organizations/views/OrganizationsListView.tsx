'use client'

import { Box } from '@mui/material'
import { OrganizationType } from '../types'
import { DataGrid } from '@mui/x-data-grid'
import { OrganizationColumnsView } from './OrganizationColumnsView'
import DialogButton from '@/components/DialogButton'

interface Props {
  organizations: OrganizationType[] | any
}

export default function OrganizationListView(props: Props) {
  const { organizations } = props

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
        <DialogButton>...</DialogButton>
      </Box>
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
