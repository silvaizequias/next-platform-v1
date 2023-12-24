'use client'

import { Session } from 'next-auth'
import { MdDashboard } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Avatar } from '@material-tailwind/react'

interface Props {
  session: Session
}

export default function AppBar(props: Props) {
  const { session } = props

  const avatar = '/avatar.svg'

  const isDevelopment = process.env.NODE_ENV === 'development'

  const router = useRouter()

  const handleClick = useCallback(
    (path?: string) => {
      if (!path) {
        if (!isDevelopment)
          router.push(`https://sistema.${process.env.NEXT_PUBLIC_URL}`)

        router.push(`http://sistema.${process.env.NEXT_PUBLIC_URL}`)
      }

      path && router.push(path)
    },
    [isDevelopment, router],
  )

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="rounded-full p-2 hover:bg-gray-50 cursor-pointer">
        <div
          className="flex items-center justify-center w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] text-light-blue-200 hover:text-light-blue-400 text-xl sm:text-2xl"
          onClick={() => handleClick()}
        >
          <MdDashboard />
        </div>
      </div>
      {session && (
        <div
          className="rounded-full p-2 opacity-25 hover:opacity-95 hover:bg-gray-50   cursor-pointer"
          onClick={() => handleClick('/perfil')}
        >
          <Avatar size="xs" src={session?.user?.image || avatar} />
        </div>
      )}
    </div>
  )
}
