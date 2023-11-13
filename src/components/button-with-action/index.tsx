'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

interface Props {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  id?: string
  message?: string
  name: string
  path?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow'
}

export default function ButtonWithAction(props: Props) {
  const { color, id, message, name, path, size, variant } = props

  const router = useRouter()

  const handleClick = useCallback(
    (path?: string, message?: string) => {
      path && router.push(path)
      message && toast.success(message)
    },
    [router],
  )

  return (
    <Button
      color={color || 'default'}
      className="uppercase"
      id={id}
      onClick={() => handleClick(path, message)}
      variant={variant || 'solid'}
      size={size || 'sm'}
    >
      {name}
    </Button>
  )
}
