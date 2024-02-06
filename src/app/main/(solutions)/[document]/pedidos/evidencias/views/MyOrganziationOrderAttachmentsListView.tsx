'use client'

import { MyOrganziationOrderAttachmentsColumnsView } from './MyOrganziationOrderAttachmentsColumnsView'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { OrderType } from '@/app/main/(management)/orders/types'
import { OrderAttachmentType } from '@/app/main/(management)/orders/attachments/types'

interface Props {
  orders: OrderType[] | any
}

export default function MyOrganziationOrderItemsListView(props: Props) {
  const { orders } = props

  const orderAttachments: any = orders?.filter(
    (attachments: OrderAttachmentType[]) => ({
      ...attachments,
    }),
  )

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <DataGrid
        autoHeight
        getRowId={(orderAttachment) => orderAttachment?.id}
        rows={orderAttachments}
        columns={MyOrganziationOrderAttachmentsColumnsView}
        disableColumnSelector
      />
    </Box>
  )
}
