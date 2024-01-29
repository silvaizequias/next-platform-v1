'use client'

import {
  Avatar,
  Button,
  Card,
  CardBody,
  IconButton,
} from '@material-tailwind/react'
import { cepMask, cnpjMask, telefoneMask } from 'masks-br'
import { OrganizationProps } from '../../types'
import Box from '@/components/box'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Fragment, useCallback, useState } from 'react'
import DialogModal from '@/components/dialog-modal'
import MyOrganizationUpdateFormView from './MyOrganizationUpdateFormView'

export default function MyOrganizationDetailView(props: OrganizationProps) {
  const { data: organization } = props

  const logotipo = organization?.image || '/logotipo.svg'

  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)

  const handleDialogModal = useCallback(() => {
    setOpenDialogModal(!openDialogModal)
  }, [openDialogModal])

  return organization ? (
    <Fragment>
      <Card>
        <CardBody className="bg-slate-200 rounded-md">
          <Box>
            <div className="flex justify-center items-center">
              <Avatar
                className="cursor-pointer p-0.5"
                color="light-blue"
                withBorder={true}
                variant="rounded"
                size="xxl"
                src={logotipo}
              />
            </div>
            <div className="w-full p-2">
              <small className="text-xs font-thin opacity-60 flex gap-2">
                documento:
                <span className="opacity-100 font-medium italic">
                  {cnpjMask(organization?.document)}
                </span>
              </small>
              <small className="text-xs font-thin opacity-60 flex gap-2">
                e-mail:
                <span className="opacity-100 font-medium italic">
                  {organization?.email}
                </span>
              </small>
              <small className="text-xs font-thin opacity-60 flex gap-2">
                telefone:
                <span className="opacity-100 font-medium italic">
                  {telefoneMask(organization?.phone)}
                </span>
              </small>
              <small className="text-xs font-thin opacity-60 flex gap-2">
                cep:
                <span className="opacity-100 font-medium italic">
                  {cepMask(organization?.zipCode)}
                </span>
              </small>
              <small className="text-xs font-thin opacity-60 flex gap-2">
                logradouro:
                <span className="opacity-100 font-medium italic">
                  {organization?.street}, {organization?.complement}
                </span>
              </small>
              <div className="flex flex-1 items-center justify-end">
                <IconButton
                  variant="text"
                  size="sm"
                  color="light-blue"
                  onClick={handleDialogModal}
                >
                  <PencilSquareIcon className="w-4 h-4" />
                </IconButton>
                <DialogModal
                  open={openDialogModal}
                  onClose={handleDialogModal}
                  title="dedicado"
                  content={`editar informações da organização ${organization?.name}`}
                >
                  <MyOrganizationUpdateFormView
                    data={organization}
                    close={handleDialogModal}
                  />
                </DialogModal>
              </div>
            </div>
          </Box>
        </CardBody>
      </Card>
    </Fragment>
  ) : null
}
