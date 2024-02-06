'use client'

import { OrderType } from '@/app/main/(management)/orders/types'
import { MyOrganziationOrdersColumnsView } from './MyOrganziationOrdersColumnsView'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

interface Props {
  orders: OrderType[] | any
}

export default function MyOrganziationOrdersListView(props: Props) {
  const { orders } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(order) => order?.id}
        rows={orders}
        columns={MyOrganziationOrdersColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
