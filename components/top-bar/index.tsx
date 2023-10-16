'use client'

import { Navbar, Typography } from '@material-tailwind/react'
import ToolBar from '../tool-bar'
import TopMenu from '../top-menu'

export default function TopBar() {
  return (
    <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 dark:bg-blue-gray-900 border-none'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <TopMenu />
          <Typography
            as='a'
            href='/'
            className='mr-4 cursor-pointer py-1.5 font-medium uppercase'
          >
            Dedicado Digital
          </Typography>
        </div>

        <ToolBar />
      </div>
    </Navbar>
  )
}
