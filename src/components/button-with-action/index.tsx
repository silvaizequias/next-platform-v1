'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

interface Props {
  id?: string
  color?: string
  message?: string
  name: string
  path?: string
}

export default function ButtonWithAction(props: Props) {
  const { id, color, message, name, path } = props

  const router = useRouter()

  const handleClick = useCallback(
    (path?: string, message?: string) => {
      path && router.push(path)
      message && toast.success(message)
    },
    [router],
  )

  return (
    <button
      className={`flex relative p-2 mx-auto uppercase text-base transition-all rounded-md bg-${color}-400 hover:bg-${color}-200`}
      id={id}
      type="button"
      onClick={() => handleClick(path, message)}
    >
      {name}
    </button>
  )
}
