'use client'

import Image from 'next/image'
import { OrganizationType } from '../../../types'
import { useCallback, useState } from 'react'
import DialogModal from '@/components/dialog-modal'
import UpdateOrganizationForm from '../../../views/organization-detail-view/form'

interface Props {
  organization: OrganizationType
}

export default function OrganizationOnlyView(props: Props) {
  const { organization } = props
  const logotipo = organization?.image || '/logotipo.svg'

  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<OrganizationType | any>(null)

  const handleDialogUpdate = useCallback(
    (data: OrganizationType) => {
      setData(data)
      setOpenDialogUpdate(!openDialogUpdate)
    },
    [openDialogUpdate],
  )
  const handleOnCloseDialog = useCallback(() => {
    setOpenDialogUpdate(!openDialogUpdate)
  }, [openDialogUpdate])

  return (
    <div className="flex flex-col justify-center gap-2 border border-sky-800 border-dashed  rounded-md p-4">
      <div className="flex justify-center cursor-pointer">
        <Image
          className="my-4 w-[179px] h-[259px]"
          src={logotipo}
          alt={organization?.name}
          priority
          //loading={'lazy'}
          width={179}
          height={259}
        />
      </div>
      <div className="flex flex-col font-light opacity-50">
        <small>
          documento:{' '}
          <span className="font-semibold opacity-100">
            {organization?.documentCode}
          </span>
        </small>
        <small>
          email:{' '}
          <span className="font-semibold opacity-100">
            {organization?.email}
          </span>
        </small>
        <small>
          telefone:{' '}
          <span className="font-semibold opacity-100">
            {organization?.phone}
          </span>
        </small>
        <small>
          endereço:{' '}
          <span className="font-semibold opacity-100">
            {organization?.street}
          </span>
        </small>
        <small>
          cep: <span className="font-semibold">{organization?.zipCode}</span>
        </small>
      </div>
      <button
        className="text-xs bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 p-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        onClick={() => handleDialogUpdate(organization)}
      >
        atualizar organização
      </button>
      <DialogModal
        onClose={handleOnCloseDialog}
        open={openDialogUpdate}
        title="dedicado"
        content="atualizar informações da organização"
      >
        <UpdateOrganizationForm organization={data} />
      </DialogModal>
    </div>
  )
}
