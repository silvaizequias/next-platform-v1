import { Session } from 'next-auth'
import Link from 'next/link'
import { memo } from 'react'
import UserMenu from './UserMenu'
import TopMenu from './TopMenu'
import AuthMenu from './AuthMenu'
import { UserType } from '@/types/user'

interface Props {
  profile: UserType | any
  session: Session
}

function Topbar(props: Props) {
  const { profile, session } = props

  return (
    <div className="fixed z-10 h-16 w-full backdrop-blur-sm bg-slate/30 dark:bg-slate-800/30 shadow-md">
      <div className="h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center justify-start space-x-2">
              {session && <TopMenu session={session} />}
              <Link
                href={'/'}
                className="text-xl text-center md:text-left text-sky-600 font-semibold lowercase"
              >
                dedicado
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
              {session ? <UserMenu profile={profile} /> : <AuthMenu />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Topbar)
