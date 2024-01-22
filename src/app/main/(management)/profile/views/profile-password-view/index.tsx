'use client'

import { useState, useCallback } from 'react'
import { UserType } from '../../../users/types'
import { Button } from '@material-tailwind/react'

export default function ProfilePasswordView() {
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<UserType | any>(null)

  const handleDialogUpdate = useCallback(
    (data: UserType) => {
      setData(data)
      setOpenDialogUpdate(!openDialogUpdate)
    },
    [openDialogUpdate],
  )

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-auto justify-between items-center">
        <h6 className="py-2 text-lg text-left font-semibold lowercase">
          senha
        </h6>
        <div className="flex flex-shrink">
          <Button color="orange" size="sm">
            atualizar senha
          </Button>
        </div>
      </div>
      <div className="py-4"></div>
    </div>
  )
}
