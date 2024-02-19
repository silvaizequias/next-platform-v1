import { Session } from 'next-auth'
import Link from 'next/link'
import { memo } from 'react'
import UserMenu from './UserMenu'
import AuthMenu from './AuthMenu'
import TopMenu from './TopMenu'

interface Props {
  session: Session
}

function Topbar(props: Props) {
  const { session } = props

  return (
    <div className="fixed h-16 w-full backdrop-blur-sm bg-slate/30 dark:bg-slate-800/30 shadow-md">
      <div className="h-full flex flex-col justify-center">
        <div className="w-lg px-4 sm:px-8">
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
              {session ? <UserMenu /> : <AuthMenu />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Topbar)
