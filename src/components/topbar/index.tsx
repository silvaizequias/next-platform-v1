import Link from 'next/link'
import ToolBar from '../toolbar'
import { FiMenu } from 'react-icons/fi'

export default function TopBar() {
  return (
    <div className="fixed w-full bg-lunar-100 text-horizon-800 dark:bg-lunar-800 dark:text-horizon-100">
      <div className="py-4">
        <div className="flex justify-between mx-8">
          <div className="flex items-center gap-4">
            <span className="text-xl cursor-pointer rounded-full p-2 dark:hover:bg-lunar-900 hover:bg-lunar-50">
              <FiMenu />
            </span>
            <Link
              href={'/'}
              className="uppercase text-lg cursor-pointer hover:text-lunar-50 dark:hover:text-lunar-900 font-light"
            >
              Dedicado Digital
            </Link>
          </div>
          <ToolBar />
        </div>
      </div>
    </div>
  )
}
