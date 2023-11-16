import Link from 'next/link'
import { HiMenu } from 'react-icons/hi'
import ToolBar from '../toolbar'
import TopMenu from '../topmenu'

export default function AppBar() {
  return (
    <div className="fixed w-full backdrop-blur-sm bg-slate/30 dark:bg-slate-800/30 shadow-md">
      <div className="mx-auto py-2">
        <div className="flex justify-between sm:mx-8 mx-2">
          <div className="flex items-center gap-4">
            <TopMenu />
            <Link href={'/'} className="uppercase hover:opacity-50">
              dedicado
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <ToolBar />
          </div>
        </div>
      </div>
    </div>
  )
}
