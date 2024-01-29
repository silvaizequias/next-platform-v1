'use client'

import DialogModal from '@/components/dialog-modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react'
import { useState, useCallback, Fragment } from 'react'
import { OrganizationKeyProps, OrganizationKeyType } from '../types'
import AuthorizationCreateFormView from './AuthorizationCreateFormView'
import AuthorizationUpdateFormView from './AuthorizationUpdateFormView'

export default function AuhorizationListView(props: OrganizationKeyProps) {
  const { data: authorizations } = props

  const logotipo = '/logotipo.svg'

  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)

  const handleDialogModal = useCallback(() => {
    setOpenDialogModal(!openDialogModal)
  }, [openDialogModal])

  const handleDialogUpdate = useCallback(
    (data: OrganizationKeyType) => {
      data && setData(data)
      setOpenDialogUpdate(!openDialogUpdate)
    },
    [openDialogUpdate],
  )

  const handleCloseDialog = useCallback(() => {
    setOpenDialogUpdate(!openDialogUpdate)
  }, [openDialogUpdate])

  return (
    <Fragment>
      <div className="w-full flex flex-auto justify-between items-center gap-4 shadow-md rounded-md bg-opacity-50 p-2">
        <div className="relative flex flex-1">
          <Input
            color="green"
            type="text"
            label="filtrar organização"
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
          content="criar chave de autorização para a organização"
        >
          <AuthorizationCreateFormView close={handleDialogModal} />
        </DialogModal>
      </div>
      <List className="w-full">
        {authorizations &&
          authorizations?.map((authorization: OrganizationKeyType) => (
            <ListItem
              key={authorization?.id}
              className="hover:shadow-sm"
              onClick={() => handleDialogUpdate(authorization)}
            >
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={authorization?.organization?.name}
                  src={authorization?.organization?.image || logotipo}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" className="uppercase">
                  {authorization?.organization?.name}
                </Typography>
                <Typography
                  variant="small"
                  color={`${authorization?.active ? 'green' : 'red'}`}
                  className="font-normal"
                >
                  {authorization?.active ? 'chave ativa' : 'chave inativa'}
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
      <DialogModal
        open={openDialogUpdate}
        onClose={handleCloseDialog}
        title="dedicado"
        content={`atualizar autorização da organização ${data?.organization?.name}`}
      >
        <AuthorizationUpdateFormView data={data} close={handleCloseDialog} />
      </DialogModal>
    </Fragment>
  )
}
