'use client'

import { MyOrganziationOrderAttachmentsColumnsView } from './MyOrganziationOrderAttachmentsColumnsView'
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
import { OrderAttachmentType } from '@/app/main/(management)/orders/attachments/types'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import { Add } from '@mui/icons-material'
import CreateOrderAttachmentFromMyOrganization from './CreateOrderAttachmentFromMyOrganization'

interface Props {
  orders: OrderType[] | any
  authorizationKey: string
}

export default function MyOrganziationOrderItemsListView(props: Props) {
  const { orders, authorizationKey } = props

  const [createEvidence, setCreateEvidence] = useState<boolean>(false)
  const handleCreateEvidence = useCallback(() => {
    setCreateEvidence(!createEvidence)
  }, [createEvidence])

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
          <Tooltip title={'criar'} onClick={handleCreateEvidence}>
            <Fab variant="circular" size="small" color="primary">
              <Add sx={{ m: 1 }} />
            </Fab>
          </Tooltip>
        </Box>
        <DataGrid
          autoHeight
          getRowId={(orderAttachment) => orderAttachment?.id}
          rows={orderAttachments}
          columns={MyOrganziationOrderAttachmentsColumnsView}
          disableColumnSelector
        />
      </Box>
      <Dialog
        open={createEvidence}
        keepMounted
        onClose={handleCreateEvidence}
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
          <CreateOrderAttachmentFromMyOrganization
            authorizationKey={authorizationKey}
            onClose={handleCreateEvidence}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
