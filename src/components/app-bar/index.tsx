'use client'

import { Session } from 'next-auth'
import { MdDashboard, MdOutlineArticle } from 'react-icons/md'
import { Avatar, Tooltip } from '@material-tailwind/react'
import Link from 'next/link'

interface Props {
  session: Session
}

export default function AppBar(props: Props) {
  const { session } = props

  const avatar = '/avatar.svg'

  const isDevelopment = process.env.NODE_ENV === 'development'
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip content={'blog dedicado'}>
        <Link
          href={
            !isDevelopment
              ? `https://blog.${NEXT_PUBLIC_URL}`
              : `http://blog.${NEXT_PUBLIC_URL}`
          }
          className="rounded-full p-2 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center justify-center w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] text-light-blue-200 hover:text-light-blue-400 text-xl sm:text-2xl">
            <MdOutlineArticle />
          </div>
        </Link>
      </Tooltip>

      <Tooltip content={'sistema dedicado'}>
        <Link
          href={
            !isDevelopment
              ? `https://sistema.${NEXT_PUBLIC_URL}`
              : `http://sistema.${NEXT_PUBLIC_URL}`
          }
          className="rounded-full p-2 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center justify-center w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] text-light-blue-200 hover:text-light-blue-400 text-xl sm:text-2xl">
            <MdDashboard />
          </div>
        </Link>
      </Tooltip>

      {session && (
        <Tooltip content={'detalhes do perfil'}>
          <Link
            href={'/perfil'}
            className="rounded-full p-2 opacity-25 hover:opacity-95 hover:bg-gray-50   cursor-pointer"
          >
            <Avatar size="xs" src={session?.user?.image || avatar} />
          </Link>
        </Tooltip>
      )}
    </div>
  )
}
