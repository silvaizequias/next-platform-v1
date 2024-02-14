'use client'

import { OrderType } from '@/app/main/(management)/orders/types'
import { MyOrganziationOrdersColumnsView } from './MyOrganziationOrdersColumnsView'
import {
  Box,
  Button,
  ButtonGroup,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import CreateOrderFromMyOrganization from './CreateOrderFromMyOrganization'

interface Props {
  orders: OrderType[] | any
  authorizationKey: string
}

export default function MyOrganziationOrdersListView(props: Props) {
  const { orders, authorizationKey } = props

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
        <ButtonGroup size="small" variant="contained">
          <Button onClick={() => handleClick(`pedidos/itens`)}>itens</Button>
          <Button onClick={() => handleClick(`pedidos/evidencias`)}>
            evidências
          </Button>
        </ButtonGroup>
        <CreateOrderFromMyOrganization authorizationKey={authorizationKey} />
      </Box>
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
