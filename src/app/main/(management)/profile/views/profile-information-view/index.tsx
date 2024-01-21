'use client'

import { useState, useCallback } from 'react'
import { UserType } from '../../../users/types'
import { Button } from '@material-tailwind/react'

export default function ProfileInformationView() {
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
      <div className="flex flex-auto justify-between items-center gap-1">
        <h6 className="py-2 text-lg text-left font-semibold lowercase">
          informações básicas
        </h6>
        <div className="flex flex-shrink">
          <Button color="light-blue" size="sm">
            atualizar informações
          </Button>
        </div>
      </div>
      <div className="py-4"></div>
    </div>
  )
}
