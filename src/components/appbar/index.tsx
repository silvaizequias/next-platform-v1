import Link from 'next/link'
import { HiMenu } from 'react-icons/hi'
import ToolBar from '../toolbar'

export default function AppBar() {
  return (
    <div className="fixed w-full">
      <div className="mx-auto py-4">
        <div className="flex justify-between mx-8">
          <div className="flex items-center gap-4">
            <span className="cursor-pointer rounded-full p-2 hover:opacity-50 hover:bg-opacity-25">
              <HiMenu />
            </span>
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
