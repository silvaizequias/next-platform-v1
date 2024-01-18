'use client'

import { useCallback, useState } from 'react'
import DialogModal from '../dialog-modal'
import SignInForm from '@/app/main/(auth)/autenticar-se/form'

export default function AuthDialog() {
  const [openDialogAuth, setOpenDialogAuth] = useState<boolean>(false)

  const handleDialogAuth = useCallback(() => {
    setOpenDialogAuth(!openDialogAuth)
  }, [openDialogAuth])

  return (
    <div className="relative block items-center">
      <button
        type="button"
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 p-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        onClick={handleDialogAuth}
      >
        autenticar-se
      </button>
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
