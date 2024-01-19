'use client'

import { useCallback, useState } from 'react'
import { OrganizationType, OrganizationUsersType } from '../../../types'
import DialogModal from '@/components/dialog-modal'
import CreateOrganizationUserForm from './form'

interface Props {
  organization: OrganizationType
}

export default function UsersThisOrganziation(props: Props) {
  const { organization } = props

  const [openDialogCreate, setOpenDialogCreate] = useState<boolean>(false)
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<OrganizationUsersType | any>(null)

  const handleDialogCreate = useCallback(() => {
    setOpenDialogCreate(!openDialogCreate)
  }, [openDialogCreate])
  const handleDialogUpdate = useCallback(
    (data: OrganizationUsersType) => {
      setData(data)
      setOpenDialogUpdate(!openDialogUpdate)
    },
    [openDialogUpdate],
  )
  const handleOnCloseDialog = useCallback(() => {
    setOpenDialogUpdate(!openDialogUpdate)
  }, [openDialogUpdate])

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-auto justify-between items-center">
        <h6 className="py-2 text-lg text-left font-semibold lowercase">
          usuáros na {organization?.name}
        </h6>
        <div className="flex flex-shrink">
          <button
            className="text-xs bg-green-400 opacity-bg-80 hover:opacity-100 my-2 p-2 rounded shadow hover:shadow-lg hover:text-slate-200"
            onClick={handleDialogCreate}
          >
            adicionar usuário
          </button>
        </div>
      </div>
      <div className="py-4">
        {organization &&
          organization?.users?.map((users: OrganizationUsersType) => (
            <div
              key={users?.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleDialogUpdate(users)}
            >
              ..
            </div>
          ))}
      </div>
      <DialogModal
        open={openDialogCreate}
        onClose={handleDialogCreate}
        title="dedicado"
        content={`adicionar usuário na ${organization?.name}`}
      >
        <CreateOrganizationUserForm />
      </DialogModal>
    </div>
  )
}
