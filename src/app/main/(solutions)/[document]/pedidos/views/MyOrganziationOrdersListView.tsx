'use client'

import { OrderType } from '@/app/main/(management)/orders/types'
import { MyOrganziationOrdersColumnsView } from './MyOrganziationOrdersColumnsView'
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  colors,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import { Add } from '@mui/icons-material'
import CreateOrderFromMyOrganization from './CreateOrderFromMyOrganization'

interface Props {
  orders: OrderType[] | any
  authorizationKey: string
}

export default function MyOrganziationOrdersListView(props: Props) {
  const { orders, authorizationKey } = props

  const [createOrder, setCreateOrder] = useState<boolean>(false)
  const handleCreateOrder = useCallback(() => {
    setCreateOrder(!createOrder)
  }, [createOrder])

  const router = useRouter()
  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  return (
    <Fragment>
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
          <Tooltip title={'criar'} onClick={handleCreateOrder}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </Box>
        <DataGrid
          autoHeight
          getRowId={(order) => order?.id}
          rows={orders}
          columns={MyOrganziationOrdersColumnsView}
          disableColumnSelector
        />
      </Box>
      <Dialog
        open={createOrder}
        keepMounted
        onClose={handleCreateOrder}
        maxWidth={'xs'}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: colors.blue[400],
            textTransform: 'lowercase',
          }}
        >
          {'dedicado'}
        </DialogTitle>
        <DialogContent>
          <CreateOrderFromMyOrganization
            authorizationKey={authorizationKey}
            onClose={handleCreateOrder}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
