'use client'

import useFetch from '@/hooks/use-fetch'
import { useCallback, useState } from 'react'
import { DomainType } from '../../../types'
import DialogModal from '@/components/dialog-modal'
import CreatePublicationDomainForm from './form'
import PublicationDomainDetailView from '../publication-domain-detail-view'

export default function PublicationDomainListView() {
  const { data: domains } = useFetch<DomainType[] | any>(
    '/api/publication-management/domains',
  )

  const [openDialogCreate, setOpenDialogCreate] = useState<boolean>(false)
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<DomainType | any>(null)

  const handleDialogCreate = useCallback(() => {
    setOpenDialogCreate(!openDialogCreate)
  }, [openDialogCreate])
  const handleDialogUpdate = useCallback(
    (data: DomainType) => {
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
          lista de domínios de publicações
        </h6>
        <div className="flex flex-shrink">
          <button
            className="text-xs bg-green-400 opacity-bg-80 hover:opacity-100 my-2 p-2 rounded shadow hover:shadow-lg hover:text-slate-200"
            onClick={handleDialogCreate}
          >
            adicionar domínio
          </button>
        </div>
      </div>
      <div className="py-4">
        {domains &&
          domains?.map((domain: DomainType) => (
            <div
              key={domain?.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleDialogUpdate(domain)}
            >
              <div className="p-2 my-2 bg-cyan-600 hover:bg-opacity-60 dark:bg-cyan-800 dark:hover:bg-opacity-80 rounded">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">
                      {domain?.organization}
                    </span>
                    <span className="text-xs font-thin">
                      {domain?.active ? 'ativo' : 'inativo'}
                    </span>
                  </div>
                  <span>
                    {new Date(domain?.createdAt).toLocaleDateString()}
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
        content=""
      >
        <CreatePublicationDomainForm />
      </DialogModal>
      <DialogModal
        onClose={handleOnCloseDialog}
        open={openDialogUpdate}
        title="dedicado"
        content=""
      >
        <PublicationDomainDetailView domain={data} />
      </DialogModal>
    </div>
  )
}
