'use client'

import DialogModal from '@/components/dialog-modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { Fragment, useCallback, useState } from 'react'

export default function MyOrganizationFormView() {
  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false)

  const handleDialogModal = useCallback(() => {
    setOpenDialogModal(!openDialogModal)
  }, [openDialogModal])
  return (
    <Fragment>
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
        ...
      </DialogModal>
    </Fragment>
  )
}
