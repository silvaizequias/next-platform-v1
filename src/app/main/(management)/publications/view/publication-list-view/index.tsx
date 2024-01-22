'use client'

import useFetch from '@/hooks/use-fetch'
import { PublicationType } from '../../types'
import { useCallback, useState } from 'react'
import DialogModal from '@/components/dialog-modal'
import CreatePublicationForm from './form'
import PublicationDetailView from '../publication-detail-view'
import { Button } from '@material-tailwind/react'

export default function PublicationListView() {
  const { data: publications } = useFetch<PublicationType[] | any>(
    '/api/publication-management/publications',
  )

  const [openDialogCreate, setOpenDialogCreate] = useState<boolean>(false)
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<PublicationType | any>(null)

  const handleDialogCreate = useCallback(() => {
    setOpenDialogCreate(!openDialogCreate)
  }, [openDialogCreate])
  const handleDialogUpdate = useCallback(
    (data: PublicationType) => {
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
          lista de publicações
        </h6>
        <div className="flex flex-shrink">
          <Button color="green" size="sm" onClick={handleDialogCreate}>
            escrever
          </Button>
        </div>
      </div>
      <div className="py-4">
        {publications &&
          publications?.map((publication: PublicationType) => (
            <div
              key={publication?.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleDialogUpdate(publication)}
            >
              <div className="p-2 my-2 bg-cyan-600 hover:bg-opacity-60 dark:bg-cyan-800 dark:hover:bg-opacity-80 rounded">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">
                      {publication?.title}
                    </span>
                    <span className="text-xs font-thin">
                      {publication?.domain?.organization} -{' '}
                      {publication?.channel}
                    </span>
                  </div>
                  <span>
                    {new Date(publication?.createdAt).toLocaleDateString()}
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
        <CreatePublicationForm />
      </DialogModal>
      <DialogModal
        onClose={handleOnCloseDialog}
        open={openDialogUpdate}
        title="dedicado"
        content=""
      >
        <PublicationDetailView publication={data} />
      </DialogModal>
    </div>
  )
}
