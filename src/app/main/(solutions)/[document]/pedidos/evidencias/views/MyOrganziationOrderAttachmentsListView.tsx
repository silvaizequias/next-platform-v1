'use client'

import { MyOrganziationOrderAttachmentsColumnsView } from './MyOrganziationOrderAttachmentsColumnsView'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { OrderType } from '@/app/main/(management)/orders/types'
import { OrderAttachmentType } from '@/app/main/(management)/orders/attachments/types'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import CreateOrderAttachmentFromMyOrganization from './CreateOrderAttachmentFromMyOrganization'

interface Props {
  orders: OrderType[] | any
  authorizationKey: string
}

export default function MyOrganziationOrderItemsListView(props: Props) {
  const { orders, authorizationKey } = props

  const orderAttachments: any = orders?.filter(
    (attachments: OrderAttachmentType[]) => ({
      ...attachments,
    }),
  )

  const params = useParams()
  const { document } = params
  const router = useRouter()
  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: 2,
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() => handleClick(`/${document}/pedidos`)}
        >
          pedidos
        </Button>
        <CreateOrderAttachmentFromMyOrganization
          authorizationKey={authorizationKey}
        />
      </Box>
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
