'use client'

import DialogContent from '@/components/dialog-content'
import { Avatar, Tooltip } from '@material-tailwind/react'
import { Fragment, useCallback, useState } from 'react'
import ProfileAvatarUpdate from './ProfileAvatarUpdate'
import { Session } from 'next-auth'

interface Props {
  image: string
  session: Session
}

export default function ProfileAvatarView(props: Props) {
  const { image, session } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  return (
    <Fragment>
      <div className="flex justify-center item-center mb-2">
        <Tooltip content={'atualizar avatar'}>
          <div
            className="rounded-full p-2 opacity-25 hover:opacity-95 hover:bg-gray-50 cursor-pointer"
            onClick={handleDialog}
          >
            <Avatar size="xl" src={image} />
          </div>
        </Tooltip>
      </div>
      <DialogContent open={openDialog} onClose={handleDialog}>
        <ProfileAvatarUpdate
          image={image}
          onClose={handleDialog}
          session={session}
        />
      </DialogContent>
    </Fragment>
  )
}
