'use client'

import { Tooltip } from '@material-tailwind/react'
import Link from 'next/link'
import { MdDashboard, MdOutlineArticle } from 'react-icons/md'

const isDevelopment = process.env.NODE_ENV === 'development'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!

export default function Appbar() {
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

      <Tooltip content={'plataforma de serviços'}>
        <Link
          href={
            !isDevelopment
              ? `https://${NEXT_PUBLIC_URL}`
              : `http://${NEXT_PUBLIC_URL}`
          }
          className="rounded-full p-2 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center justify-center w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] text-light-blue-200 hover:text-light-blue-400 text-xl sm:text-2xl">
            <MdDashboard />
          </div>
        </Link>
      </Tooltip>
    </div>
  )
}
