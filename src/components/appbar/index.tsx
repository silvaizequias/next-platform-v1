import { Tooltip } from '@material-tailwind/react'
import Link from 'next/link'
import { MdOutlineArticle } from 'react-icons/md'
import Accessbar from '../accessbar'
import { Session } from 'next-auth'
import { UserType } from '@/app/management/users/types'

const isDevelopment = process.env.NODE_ENV === 'development'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!
const blogUrl = !isDevelopment
  ? `https://blog.${NEXT_PUBLIC_URL}`
  : `http://blog.${NEXT_PUBLIC_URL}`

interface Props {
  session: Session
  profile: UserType
}

export default async function Appbar(props: Props) {
  const { session, profile } = props

  return (
    <div className="flex items-center justify-end gap-4">
      <Tooltip content={'blog dedicado'}>
        <Link
          href={blogUrl}
          className="rounded-full p-2 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center justify-center w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] text-light-blue-200 hover:text-light-blue-400 text-xl sm:text-2xl">
            <MdOutlineArticle />
          </div>
        </Link>
      </Tooltip>
      <Accessbar profile={profile} session={session} />
    </div>
  )
}
