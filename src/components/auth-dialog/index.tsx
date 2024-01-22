'use client'

import { useCallback, useState } from 'react'
import DialogModal from '../dialog-modal'
import SignInForm from '@/app/main/(auth)/autenticar-se/form'
import { Button } from '@material-tailwind/react'

export default function AuthDialog() {
  const [openDialogAuth, setOpenDialogAuth] = useState<boolean>(false)

  const handleDialogAuth = useCallback(() => {
    setOpenDialogAuth(!openDialogAuth)
  }, [openDialogAuth])

  return (
    <div className="relative block items-center">
      <Button type="button" color="light-blue" onClick={handleDialogAuth}>
        autenticar-se
      </Button>
      <DialogModal
        onClose={handleDialogAuth}
        open={openDialogAuth}
        title="dedicado"
      >
        <SignInForm />
      </DialogModal>
    </div>
  )
}
