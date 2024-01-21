'use client'

import { useCallback, useState } from 'react'
import { UserType } from '../../../users/types'
import { Button } from '@material-tailwind/react'

export default function ProfileAddressView() {
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
          endereço
        </h6>
        <div className="flex flex-shrink">
          <Button color="light-blue" size="sm">
            atualizar endereço
          </Button>
        </div>
      </div>
      <div className="py-4"></div>
    </div>
  )
}
