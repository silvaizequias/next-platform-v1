'use client'

import { PublicationType } from '@/app/main/(management)/publications/types'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { MyOrganizationPublicationsColumnsViews } from './MyOrganizationPublicationsColumnsViews'

interface Props {
  publications: PublicationType[] | any
}

export default function MyOrganizationPublicationsListView(props: Props) {
  const { publications } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(publication) => publication?.id}
        rows={publications}
        columns={MyOrganizationPublicationsColumnsViews}
        disableColumnSelector
      />
    </Box>
  )
}
