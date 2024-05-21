'use client'

import { usePathname } from 'next/navigation'
import {
  MdDiscount,
  MdOutlineEditCalendar,
  MdOutlineHome,
} from 'react-icons/md'
import UploadDataButton from './UploadDataButton'
import { UserType } from '@/types/user'
import { usePlatform } from '@/contexts/PlatformContext'

export default function PlatformMenu() {
  const { user }: UserType | any = usePlatform()
  const pathname = usePathname()

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
            href={`/pedidos`}
            className="flex justify-center item-center space-x-2"
          >
            <MdDiscount
              className={
                pathname == `/pedidos`
                  ? 'text-white animate-pulse'
                  : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400">
          <a
            href={`/tarefas`}
            className="flex justify-center item-center space-x-2"
          >
            <MdOutlineEditCalendar
              className={
                pathname == `/tarefas`
                  ? 'text-white animate-pulse'
                  : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
      </ul>
      <div className="flex item-center justify-end space-x-2">
        {pathname == '/tarefas' && (
          <UploadDataButton param="tasks" document={user?.document} />
        )}
      </div>
    </div>
  )
}
