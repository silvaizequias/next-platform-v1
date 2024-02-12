'use client'

import { MyOrganziationOrderItemsColumnsView } from './MyOrganziationOrderItemsColumnsView'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  colors,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { OrderType } from '@/app/main/(management)/orders/types'
import { OrderItemType } from '@/app/main/(management)/orders/items/types'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import { Add } from '@mui/icons-material'

interface Props {
  orders: OrderType[] | any
}

export default function MyOrganziationOrderItemsListView(props: Props) {
  const { orders } = props

  const [createItem, setCreateItem] = useState<boolean>(false)
  const handleCreateItem = useCallback(() => {
    setCreateItem(!createItem)
  }, [createItem])

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
          <Button
            size="small"
            variant="contained"
            onClick={() => handleClick(`/${document}/pedidos`)}
          >
            pedidos
          </Button>
          <Tooltip title={'criar'} onClick={handleCreateItem}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </Box>
        <DataGrid
          autoHeight
          getRowId={(orderItem) => orderItem?.id}
          rows={orderItems}
          columns={MyOrganziationOrderItemsColumnsView}
          disableColumnSelector
        />
      </Box>
      <Dialog
        open={createItem}
        keepMounted
        onClose={handleCreateItem}
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
        <DialogContent>...</DialogContent>
      </Dialog>
    </Fragment>
  )
}
