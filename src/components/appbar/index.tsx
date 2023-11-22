import Link from 'next/link'
import ToolBar from '../toolbar'
import TopMenu from '../topmenu'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function AppBar(props: Props) {
  const { session } = props

  return (
    <div className="fixed w-full backdrop-blur-sm bg-slate/30 dark:bg-slate-800/30 shadow-md">
      <div className="mx-auto py-2">
        <div className="flex justify-between items-center sm:mx-8 mx-2">
          <div className="flex items-center gap-4">
            <TopMenu session={session} />
            <Link href={'/'} className="uppercase hover:opacity-50">
              dedicado
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <ToolBar session={session} />
          </div>
        </div>
      </div>
    </div>
  )
}
