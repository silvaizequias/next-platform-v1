import Appbar from '@/components/app-bar'
import Topbar from '@/components/top-bar'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { Fragment, ReactNode } from 'react'

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  return (
    <Fragment>
      {session && (
        <Topbar>
          <Appbar session={session!} />
        </Topbar>
      )}
      <div className={session ? 'pt-16' : 'pt-0'}>{children}</div>
      <div className="flex justify-center w-full py-8">
        <div className="flex flex-col max-w-sm sm:max-w-4xl w-full border-t-sky-800 dark:border-t-sky-600 border-opacity-20 dark:border-opacity-20  border-t-[0.01rem] border-spacing-4">
          <h6 className="mt-4 text-center font-medium text-base">
            dedicado digital
          </h6>
          <span className="text-center lining-nums text-xs opacity-80">
            © 2023 - {new Date().getUTCFullYear()} | 52.378.516/0001-78
          </span>
          <small className="text-center text-xs opacity-60 font-extralight"></small>
          <span className="text-center text-xs opacity-60 font-extralight">
            todos os direitos reservados
          </span>
        </div>
      </div>
    </Fragment>
  )
}
