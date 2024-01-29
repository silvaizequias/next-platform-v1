'use client'

import {
  SubscriptionProps,
  SubscriptionType,
} from '@/app/main/(management)/subscriptions/types'
import DialogModal from '@/components/dialog-modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  Typography,
} from '@material-tailwind/react'
import { Fragment, useCallback, useState } from 'react'
import OrganziationSubscriptionDetailView from './OrganziationSubscriptionDetailView'

export default function OrganizationSubscriptionListView(
  props: SubscriptionProps,
) {
  const { data: subscriptions } = props

  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)
  const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)

  const handleDialogModal = useCallback(() => {
    setOpenDialogModal(!openDialogModal)
  }, [openDialogModal])

  const handleDialogDetail = useCallback(
    (data: SubscriptionType) => {
      data && setData(data)
      setOpenDialogDetail(!openDialogDetail)
    },
    [openDialogDetail],
  )

  const handleCloseDialog = useCallback(() => {
    setOpenDialogDetail(!openDialogDetail)
  }, [openDialogDetail])

  return (
    <Fragment>
      <div className="w-full flex flex-auto justify-between items-center gap-4 shadow-md rounded-md bg-opacity-50 p-2">
        <div className="relative flex flex-1">
          <Input
            color="green"
            type="text"
            label="filtrar assinaturas"
            className="pr-20"
            containerProps={{
              className: 'min-w-0',
            }}
            crossOrigin={undefined}
          />
          <Button
            size="sm"
            color={'green'}
            className="!absolute right-1 top-1 rounded"
          >
            filtrar
          </Button>
        </div>
        <IconButton
          variant="text"
          size="md"
          color="green"
          onClick={handleDialogModal}
        >
          <PlusIcon className="w-6 h-6" />
        </IconButton>
        <DialogModal
          open={openDialogModal}
          onClose={handleDialogModal}
          title="dedicado"
          content="assinar pacote"
        >
          ...
        </DialogModal>
      </div>
      <List className="w-full">
        {subscriptions &&
          subscriptions?.map((subscription: SubscriptionType) => (
            <ListItem
              key={subscription?.id}
              className="hover:shadow-sm"
              onClick={() => handleDialogDetail(subscription)}
            >
              <div>
                <Typography variant="h6" className="uppercase">
                  pacote...
                </Typography>
                <Typography variant="small" className="font-normal">
                  limitação...
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
      <DialogModal
        open={openDialogDetail}
        onClose={handleCloseDialog}
        title="dedicado"
        content={`detalhes da assinatura`}
      >
        <OrganziationSubscriptionDetailView
          data={data}
          close={handleCloseDialog}
        />
      </DialogModal>
    </Fragment>
  )
}
