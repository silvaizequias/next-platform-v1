'use client'

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
  IconButton,
  Input,
  Button,
} from '@material-tailwind/react'
import { UserProps, UserType } from '../types'
import { Fragment, useCallback, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import DialogModal from '@/components/dialog-modal'
import UserCreateFormView from './UserCreateFormView'

export default function UserListView(props: UserProps) {
  const { data: users } = props

  const avatar = '/avatar.svg'

  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)

  const handleDialogModal = useCallback(() => {
    setOpenDialogModal(!openDialogModal)
  }, [openDialogModal])

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
          content="criar usuário na plataforma"
        >
          <UserCreateFormView close={openDialogModal} />
        </DialogModal>
      </div>
      <List className="w-full">
        {users &&
          users?.map((user: UserType) => (
            <ListItem key={user?.id} className="hover:shadow-sm">
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={user?.name}
                  src={user?.image || avatar}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" className="uppercase">
                  {user?.name}
                </Typography>
                <Typography variant="small" className="font-normal">
                  {user?.phone}
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
    </Fragment>
  )
}
