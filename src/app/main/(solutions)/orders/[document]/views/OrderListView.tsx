'use client'

import { Fragment, useCallback, useState } from 'react'
import { OrderProps, OrderType } from '../types'
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from '@material-tailwind/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { OrganizationType } from '@/app/main/(management)/organizations/types'
import moment from 'moment'
import 'moment/locale/pt-br'
import DialogModal from '@/components/dialog-modal'
import CreateOrderFormView from './CreateOrderFormView'

export default function OrderListView({
  data,
  organization,
}: {
  data: OrderProps
  organization: OrganizationType
}) {
  const orders: OrderType[] | any = data

  const logotipo = '/logotipo.svg'

  const [openDialogCreate, setOpenDialogCreate] = useState<boolean>(false)
  const handleOpenDialogCreate = useCallback(() => {
    setOpenDialogCreate(!openDialogCreate)
  }, [openDialogCreate])

  return (
    <Fragment>
      <div className="w-full flex flex-auto justify-between items-center gap-4 shadow-md rounded-md bg-opacity-50 p-2">
        <div className="relative flex flex-1">
          <Input
            color="green"
            type="text"
            label="filtrar pedido"
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
          onClick={handleOpenDialogCreate}
        >
          <PlusIcon className="w-6 h-6" />
        </IconButton>
        <DialogModal
          open={openDialogCreate}
          onClose={handleOpenDialogCreate}
          title="dedicado"
          content="criar pedido"
        >
          <CreateOrderFormView organization={organization} close={handleOpenDialogCreate} />
        </DialogModal>
      </div>
      <List className="w-full">
        {orders &&
          orders?.map((order: OrderType) => (
            <ListItem key={order?.id} className="hover:shadow-sm">
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={'order?.customer'}
                  src={logotipo}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" className="uppercase">
                  {order?.customer}
                </Typography>
                <Typography variant="small" className="font-normal">
                  {order?.code}
                </Typography>
              </div>
              <ListItemSuffix className="flex flex-col sm:flex-row gap-2">
                <Chip
                  value={order?.started ? 'iniciada' : 'fila de espera'}
                  variant="ghost"
                  size="sm"
                  color={order?.started ? 'green' : 'yellow'}
                />
                {order?.deadline && (
                  <Chip
                    value={moment(order?.deadline).format('llll')}
                    variant="ghost"
                    size="sm"
                    color="yellow"
                  />
                )}
              </ListItemSuffix>
            </ListItem>
          ))}
      </List>
    </Fragment>
  )
}
