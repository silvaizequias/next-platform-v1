'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

interface Props {
  id?: string
  message?: string
  name: string
  path?: string
}

export default function ButtonWithAction(props: Props) {
  const { id, message, name, path } = props

  const router = useRouter()

  const handleClick = useCallback(
    (path?: string, message?: string) => {
      path && router.push(path)
      message && toast.success(message)
    },
    [router],
  )

  return (
    <div className="relative">
      <button
        type="button"
        className="uppercase"
        id={id}
        onClick={() => handleClick(path, message)}
      >
        {name}
      </button>
    </div>
  )
}
