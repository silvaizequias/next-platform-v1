'use client'

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
  Button,
  IconButton,
  Input,
} from '@material-tailwind/react'
import { MyOrganizationUsersProps, OrganizationUsersType } from '../../types'
import { Fragment, useCallback, useState } from 'react'
import DialogModal from '@/components/dialog-modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import CreateOrganizationUserFormView from './CreateOrganizationUserFormView'
import UpdateOrganizationUserFormView from './UpdateOrganizationUserFormView'

export default function MyOrganizationUserListView(
  props: MyOrganizationUsersProps,
) {
  const { data: users } = props
  const avatar = '/avatar.svg'

  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)
  const [openDialogModalUpdate, setOpenDialogModalUpdate] =
    useState<boolean>(false)
  const [data, setData] = useState<any>(null)

  const handleDialogModal = useCallback(() => {
    setOpenDialogModal(!openDialogModal)
  }, [openDialogModal])

  const handleDialogModalUpdate = useCallback(
    (data: OrganizationUsersType) => {
      data && setData(data)
      setOpenDialogModalUpdate(!openDialogModalUpdate)
    },
    [openDialogModalUpdate],
  )

  const handleCloseDialog = useCallback(() => {
    setOpenDialogModalUpdate(!openDialogModalUpdate)
  }, [openDialogModalUpdate])

  return (
    <Fragment>
      <div className="w-full flex flex-auto justify-between items-center gap-4 shadow-md rounded-md bg-opacity-50 p-2">
        <div className="relative flex flex-1">
          <Input
            color="green"
            type="text"
            label="filtrar usuário"
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
          content="adicionar usuário"
        >
          <CreateOrganizationUserFormView close={handleDialogModal} />
        </DialogModal>
      </div>
      <List className="w-full">
        {users &&
          users?.map((organizationUser: OrganizationUsersType) => (
            <ListItem
              key={organizationUser?.id}
              className="hover:shadow-sm"
              onClick={() => handleDialogModalUpdate(organizationUser)}
            >
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={organizationUser?.user?.name}
                  src={organizationUser?.user?.image || avatar}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6">
                  {organizationUser?.user?.name}
                </Typography>
                <Typography variant="small" className="font-normal">
                  {organizationUser?.role}
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
      <DialogModal
        open={openDialogModalUpdate}
        onClose={handleCloseDialog}
        title="dedicado"
        content={`atualizar ${data?.user?.name} na organização`}
      >
        <UpdateOrganizationUserFormView data={data} close={handleCloseDialog} />
      </DialogModal>
    </Fragment>
  )
}
