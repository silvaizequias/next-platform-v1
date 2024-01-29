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
import { MyOrganizationProps, OrganizationUsersType } from '../../types'
import { Fragment, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import DialogModal from '@/components/dialog-modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import MyOrganizationCreateFormView from './MyOrganizationCreateFormView'

export default function MyOrganizationListView(props: MyOrganizationProps) {
  const { data } = props
  const myOrganizations: OrganizationUsersType[] = data

  const logotipo = '/logotipo.svg'

  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)

  const handleDialogModal = useCallback(() => {
    setOpenDialogModal(!openDialogModal)
  }, [openDialogModal])

  const router = useRouter()
  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  return (
    <Fragment>
      <div className="w-full flex flex-auto justify-between items-center gap-4 shadow-md rounded-md bg-opacity-50 p-2">
        <div className="relative flex flex-1">
          <Input
            color="green"
            type="text"
            label="filtrar organizações"
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
          content="criar minha organização"
        >
          <MyOrganizationCreateFormView close={handleDialogModal} />
        </DialogModal>
      </div>
      {myOrganizations && (
        <List className="w-full">
          {data?.map((myOrganization: OrganizationUsersType) => (
            <ListItem
              key={myOrganization?.id}
              className="hover:shadow-sm"
              onClick={() =>
                handleClick(
                  `organizations/${myOrganization?.organization?.document}`,
                )
              }
            >
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={myOrganization?.organization?.name}
                  src={myOrganization?.organization?.image || logotipo}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" className="uppercase">
                  {myOrganization?.organization?.name}
                </Typography>
                <Typography variant="small" className="font-normal">
                  {myOrganization?.role}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </Fragment>
  )
}
