'use client'

import { MyOrganziationOrderItemsColumnsView } from './MyOrganziationOrderItemsColumnsView'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { OrderType } from '@/app/main/(management)/orders/types'
import { OrderItemType } from '@/app/main/(management)/orders/items/types'

interface Props {
  orders: OrderType[] | any
}

export default function MyOrganziationOrderItemsListView(props: Props) {
  const { orders } = props

  const orderItems: any = orders?.filter((items: OrderItemType[]) => ({
    ...items,
  }))

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(orderItem) => orderItem?.id}
        rows={orderItems}
        columns={MyOrganziationOrderItemsColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
