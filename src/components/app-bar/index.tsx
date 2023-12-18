'use client'

import { Session } from 'next-auth'
import { MdDashboard } from 'react-icons/md'
import Avatar from '../avatar'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface Props {
  session: Session
}

export default function AppBar(props: Props) {
  const { session } = props

  const router = useRouter()

  const handleClick = useCallback(
    (path?: string, message?: string) => {
      path && router.push(path)
    },
    [router],
  )

  return (
    <div className="flex items-center justify-end">
      <div className="rounded-full p-2 hover:opacity-75 cursor-pointer">
        <div className="flex items-center justify-center w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] text-slate-100 hover:text-sky-400 text-2xl sm:text-4xl" onClick={() => handleClick('https://sistema.dedicado.digital')}>
          <MdDashboard />
        </div>
      </div>
      {session && <Avatar session={session} />}
    </div>
  )
}
