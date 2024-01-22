'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { UserType } from '../../../users/types'
import { Avatar, Button } from '@material-tailwind/react'
import Box from '@/components/box'
import DialogModal from '@/components/dialog-modal'
import ProfilePasswordForm from '../profile-password-view/form'
import { Session } from 'next-auth'
import useFetch from '@/hooks/use-fetch'
import ProfileInformationForm from './form'

interface Props {
  session: Session
}

export default function ProfileInformationView(props: Props) {
  const { session } = props
  const { data: user } = useFetch<UserType | any>(
    `/api/users/${session?.user?.id}`,
  )

  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<Session | any>(null)

  const handleDialogUpdate = useCallback(
    (data: Session) => {
      setData(data)
      setOpenDialogUpdate(!openDialogUpdate)
    },
    [openDialogUpdate],
  )
  const handleOnCloseDialog = useCallback(() => {
    setOpenDialogUpdate(!openDialogUpdate)
  }, [openDialogUpdate])

  const image = user?.image || '/logotipo.svg'

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-auto justify-between items-center gap-1">
        <h6 className="py-2 text-lg text-left font-semibold lowercase">
          informações básicas
        </h6>
        <div className="flex flex-shrink">
          <Button
            color="orange"
            size="sm"
            onClick={() => handleDialogUpdate(session)}
          >
            atualizar senha
          </Button>
        </div>
      </div>
      <div className="py-4">
        <Box>
          <div className="w-full sm:w-1/5">
            <div className="flex justify-center items-center w-full h-full">
              <Avatar
                src={image}
                alt="avatar"
                variant="rounded"
                withBorder={true}
                color="light-blue"
                className="p-0.5 cursor-pointer hover:opacity-80 hover:shadow-md"
                size="xxl"
              />
            </div>
          </div>
          <div className="w-full sm:w-4/5 border border-dashed border-sky-800">
            <ProfileInformationForm user={user} />
          </div>
        </Box>
      </div>
      <DialogModal
        onClose={handleOnCloseDialog}
        open={openDialogUpdate}
        title="atualizar senha"
      >
        <ProfilePasswordForm session={data} />
      </DialogModal>
    </div>
  )
}
