'use client'

import { UserType } from '@/app/management/users/types'
import { Tooltip } from '@material-tailwind/react'
import { Session } from 'next-auth'
import { Fragment, useCallback, useState } from 'react'
import { MdOutlineLogin } from 'react-icons/md'
import ProfileMenu from '../profile-menu'
import DialogContent from '../dialog-content'
import UserAccess from '../user-access'

interface Props {
  session: Session
  profile?: UserType
}

export default function Accessbar(props: Props) {
  const { session, profile } = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  return (
    <Fragment>
      {!session ? (
        <Tooltip content={'autenticar-se'}>
          <div className="rounded-full p-2 hover:bg-gray-50 cursor-pointer">
            <div
              className="flex items-center justify-center w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] text-light-blue-200 hover:text-light-blue-400 text-xl sm:text-2xl"
              onClick={handleDialog}
            >
              <MdOutlineLogin />
            </div>
          </div>
        </Tooltip>
      ) : (
        <ProfileMenu profile={profile!} />
      )}
      <DialogContent open={openDialog} onClose={handleDialog}>
        <UserAccess />
      </DialogContent>
    </Fragment>
  )
}
