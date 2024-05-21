'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  MdDiscount,
  MdDomain,
  MdGroups2,
  MdLogout,
  MdOutlineHome,
} from 'react-icons/md'
import { UserType } from '@/types/user'
import { usePlatform } from '@/contexts/PlatformContext'
import { useCallback } from 'react'
import { updateProfileAvailable } from '@/app/main/perfil/actions'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'

export default function ControlMenu() {
  const { user }: UserType | any = usePlatform()
  const pathname = usePathname()

  const route = useRouter()
  const handleSignOut = useCallback(async () => {
    await updateProfileAvailable(false)
      .then(() => {
        toast.success(`até breve ${user?.name}`)
        signOut({ redirect: true })
        route.refresh()
      })
      .catch((error: any) => console.log(error))
  }, [route, user])

  return (
    <div className="w-full p-2 flex items-center bg-slate-200 dark:bg-slate-800 rounded-md shadow-md mb-4">
      <ul className="flex flex-1 items-center space-x-2">
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400 hover:text-white">
          <a href={`/`} className="flex justify-center item-center space-x-2">
            <MdOutlineHome
              className={
                pathname == `/` ? 'text-white animate-pulse' : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400">
          <a
            href={`/orders`}
            className="flex justify-center item-center space-x-2"
          >
            <MdDiscount
              className={
                pathname == `/orders` ? 'text-white animate-pulse' : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400">
          <a
            href={`/organizations`}
            className="flex justify-center item-center space-x-2"
          >
            <MdDomain
              className={
                pathname == `/organizations`
                  ? 'text-white animate-pulse'
                  : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400">
          <a
            href={`/users`}
            className="flex justify-center item-center space-x-2"
          >
            <MdGroups2
              className={
                pathname == `/users` ? 'text-white animate-pulse' : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
      </ul>
      <div className="flex item-center justify-end space-x-2">
        <span
          className="flex rounded-md bg-sky-600/50 hover:bg-sky-400 mx-auto p-2 cursor-pointer"
          onClick={handleSignOut}
        >
          <MdLogout className="hover:text-white animate-pulse" size={24} />
        </span>
      </div>
    </div>
  )
}
