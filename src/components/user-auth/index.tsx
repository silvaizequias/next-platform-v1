'use client'

import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'

export default function UserAuth() {
  return (
    <div className="block relative">
      <IconButton variant="text" color="blue-gray" className="rounded-full">
        <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
      </IconButton>
    </div>
  )
}
