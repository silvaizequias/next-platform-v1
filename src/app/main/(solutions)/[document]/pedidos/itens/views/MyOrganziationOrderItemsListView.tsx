'use client'

import { MyOrganziationOrderItemsColumnsView } from './MyOrganziationOrderItemsColumnsView'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { OrderType } from '@/app/main/(management)/orders/types'
import { OrderItemType } from '@/app/main/(management)/orders/items/types'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import CreateOrderItemFromMyOrganization from './CreateOrderItemFromMyOrganization'

interface Props {
  orders: OrderType[] | any
  authorizationKey: string
}

export default function MyOrganziationOrderItemsListView(props: Props) {
  const { orders, authorizationKey } = props

  const orderItems: any = orders?.filter((items: OrderItemType[]) => ({
    ...items,
  }))

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
        <CreateOrderItemFromMyOrganization
          authorizationKey={authorizationKey}
        />
      </Box>
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
