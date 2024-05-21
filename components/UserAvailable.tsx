'use client'

import { usePlatform } from '@/contexts/PlatformContext'
import { updateProfileAvailable } from '@/app/main/perfil/actions'
import { UserType } from '@/types/user'
import { useCallback, useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import { MdJoinLeft, MdJoinRight } from 'react-icons/md'

export default function UserAvailable() {
  const { user }: UserType | any = usePlatform()
  let status: boolean = user?.available

  const [available, setAvailable] = useState<boolean>(status)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    status && setAvailable(status)
  }, [status])

  const handleAvailable = useCallback(() => {
    user &&
      startTransition(async () =>
        available
          ? await updateProfileAvailable(false)
              .then(() => {
                setAvailable(!available)
                toast.success(
                  `${
                    user?.name.split(' ')[0]
                  }, você ficou invisível e indispinível na plataforma`,
                  { duration: 10000 },
                )
              })
              .catch((error: any) => {
                toast.error(error?.message)
              })
          : await updateProfileAvailable(true)
              .then(() => {
                setAvailable(!available)
                toast.success(
                  `${
                    user?.name.split(' ')[0]
                  }, agora você está visível e dispinível na plataforma`,
                  { duration: 10000 },
                )
              })
              .catch((error: any) => {
                toast.error(error?.message)
              }),
      )
  }, [available, user])

  return user ? (
    <div className="relative">
      <span
        className="flex justify-center items-center p-2 rounded-full cursor-pointer hover:shadow-md"
        onClick={handleAvailable}
      >
        {!available ? (
          <MdJoinRight size={24} className="rounded-full" />
        ) : (
          <MdJoinLeft size={24} className="rounded-full text-green-400" />
        )}
      </span>
    </div>
  ) : null
}
