'use client'

import { OrganizationType } from '@/app/main/(management)/organizations/types'
import DialogModal from '@/components/dialog-modal'
import useFetch from '@/hooks/use-fetch'
import { useCallback, useState } from 'react'
import CreateOrganizationForm from './form'
import OrganizationDetailView from '../organization-detail-view'
import { Button } from '@material-tailwind/react'

export default function OrganizationListView() {
  const { data: organizations } = useFetch<OrganizationType[] | any>(
    '/api/organizations',
  )

  const [openDialogCreate, setOpenDialogCreate] = useState<boolean>(false)
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<OrganizationType | any>(null)

  const handleDialogCreate = useCallback(() => {
    setOpenDialogCreate(!openDialogCreate)
  }, [openDialogCreate])
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
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-auto justify-between items-center">
        <h6 className="py-2 text-lg text-left font-semibold lowercase">
          lista de organizações
        </h6>
        <div className="flex flex-shrink">
          <Button color="green" size="sm" onClick={handleDialogCreate}>
            criar organização
          </Button>
        </div>
      </div>
      <div className="py-4">
        {organizations &&
          organizations?.map((organization: OrganizationType) => (
            <div
              key={organization?.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleDialogUpdate(organization)}
            >
              <div className="p-2 my-2 bg-cyan-600 hover:bg-opacity-60 dark:bg-cyan-800 dark:hover:bg-opacity-80 rounded">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">
                      {organization?.name}
                    </span>
                    <span className="text-xs font-thin">
                      {organization?.documentCode}
                    </span>
                  </div>
                  <span>
                    {new Date(organization?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <DialogModal
        onClose={handleDialogCreate}
        open={openDialogCreate}
        title="dedicado"
        content="criar organização na plataforma"
      >
        <CreateOrganizationForm />
      </DialogModal>
      <DialogModal
        onClose={handleOnCloseDialog}
        open={openDialogUpdate}
        title="dedicado"
        content={`atualizar informações da organização ${data?.name}`}
      >
        <OrganizationDetailView organization={data} />
      </DialogModal>
    </div>
  )
}
