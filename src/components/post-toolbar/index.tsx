'use client'

import { Tooltip } from '@material-tailwind/react'
import { MdArtTrack, MdComment, MdIosShare } from 'react-icons/md'
import Link from 'next/link'

export default function PostToolbar() {
  return (
    <div className="px-10 py-2 flex justify-center items-center gap-4">
      <Tooltip content={'voltar ao início'}>
        <Link
          href={'/'}
          className="text-xl rounded-full p-2 bg-gray-50 text-light-blue-200 hover:text-light-blue-400"
        >
          <MdArtTrack />
        </Link>
      </Tooltip>
      <Tooltip content={'compartilhar'}>
        <Link
          href={'#'}
          className="text-xl rounded-full p-2 bg-gray-50 text-light-blue-200 hover:text-light-blue-400"
        >
          <MdIosShare />
        </Link>
      </Tooltip>
      <Tooltip content={'comentar'}>
        <Link
          href={'#'}
          className="text-xl rounded-full p-2 bg-gray-50 text-light-blue-200 hover:text-light-blue-400"
        >
          <MdComment />
        </Link>
      </Tooltip>
    </div>
  )
}
