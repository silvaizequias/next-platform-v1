'use client'

import { useCallback, useState } from 'react'
import { OrganizationType, OrganizationUsersType } from '../../../types'
import DialogModal from '@/components/dialog-modal'
import CreateOrganizationUserForm from './form'
import OrganizationUserDetailView from '../organization-user-detail-view'

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
          organization?.users?.map(
            (organizationUser: OrganizationUsersType) => (
              <div
                key={organizationUser?.id}
                className="cursor-pointer hover:shadow-lg"
                onClick={() => handleDialogUpdate(organizationUser)}
              >
                <div className="p-2 my-2 bg-cyan-600 hover:bg-opacity-60 dark:bg-cyan-800 dark:hover:bg-opacity-80 rounded">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-base font-medium">
                        {organizationUser?.user?.name}
                      </span>
                      <span className="text-xs font-thin">
                        {organizationUser?.role}
                      </span>
                    </div>
                    <span>
                      {new Date(
                        organizationUser?.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
      </div>
      <DialogModal
        open={openDialogCreate}
        onClose={handleDialogCreate}
        title="dedicado"
        content={`adicionar usuário na ${organization?.name}`}
      >
        <CreateOrganizationUserForm />
      </DialogModal>
      <DialogModal
        open={openDialogUpdate}
        onClose={handleOnCloseDialog}
        title="dedicado"
        content={`atualizar ${data?.user?.name} na ${organization?.name}`}
      >
        <OrganizationUserDetailView organizationUser={data} />
      </DialogModal>
    </div>
  )
}
