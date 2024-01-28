'use client'

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
  Input,
  Button,
  IconButton,
} from '@material-tailwind/react'
import { OrganizationProps, OrganizationType } from '../types'
import { useState, useCallback, Fragment } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import DialogModal from '@/components/dialog-modal'
import { useRouter } from 'next/navigation'
import OrganizationCreateFormView from './OrganizationCreateFormView'

export default function OrganizationListView(props: OrganizationProps) {
  const { data: organizations } = props

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
          content="criar organização"
        >
          <OrganizationCreateFormView close={handleDialogModal} />
        </DialogModal>
      </div>
      <List className="w-full">
        {organizations &&
          organizations?.map((organization: OrganizationType) => (
            <ListItem
              key={organization?.id}
              className="hover:shadow-sm"
              onClick={() =>
                handleClick(`organizations/${organization?.document}`)
              }
            >
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={organization?.name}
                  src={organization?.image || logotipo}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" className="uppercase">
                  {organization?.name}
                </Typography>
                <Typography variant="small" className="font-normal">
                  {organization?.document}
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
    </Fragment>
  )
}
