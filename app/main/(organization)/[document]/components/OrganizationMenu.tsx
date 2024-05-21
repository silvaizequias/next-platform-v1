'use client'

import { useParams, usePathname } from 'next/navigation'
import { MdGroups, MdOutlineHome, MdOutlineHomeWork } from 'react-icons/md'
import UpdateOrganizationButton from './UpdateOrganizationButton'
import CreateOrderButton from '../pedidos/components/CreateOrderButton'
import CreateMemberButton from '../membros/components/CreateMemberButton'
import UploadDataButton from '@/components/UploadDataButton'
import { Fragment } from 'react'

export default function OrganizationMenu() {
  const params = useParams()
  const { document } = params
  const pathname = usePathname()

  return (
    <div className="w-full p-2 flex items-center bg-slate-200 dark:bg-slate-800 rounded-md shadow-md mb-4">
      <ul className="flex flex-1 items-center space-x-2">
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400 hover:text-white">
          <a href={`/`} className="flex justify-center item-center space-x-2">
            <MdOutlineHome className={'font-thin'} size={24} />
          </a>
        </li>
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400">
          <a
            href={`/${document}`}
            className="flex justify-center item-center space-x-2"
          >
            <MdOutlineHomeWork
              className={
                pathname == `/${document}`
                  ? 'text-white animate-pulse'
                  : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
        <li className="p-2 rounded-md bg-sky-600/50 hover:bg-sky-400">
          <a
            href={`/${document}/membros`}
            className="flex justify-center item-center space-x-2"
          >
            <MdGroups
              className={
                pathname == `/${document}/membros`
                  ? 'text-white animate-pulse'
                  : 'font-thin'
              }
              size={24}
            />
          </a>
        </li>
      </ul>
      <div className="flex item-center justify-end space-x-2">
        {pathname == `/${document}/membros` && (
          <Fragment>
            <CreateMemberButton />
            <UploadDataButton param="members" document={`${document}`} />
          </Fragment>
        )}
        {pathname == `/${document}/pedidos` && (
          <Fragment>
            <CreateOrderButton />
            <UploadDataButton param="orders" document={`${document}`} />
          </Fragment>
        )}
        {pathname == `/${document}` && <UpdateOrganizationButton />}
      </div>
    </div>
  )
}
