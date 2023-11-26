'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/user'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

interface Props {
  user: UserType
}

export default function ProfileImageUpdate(props: Props) {
  const { user } = props
  const { data, mutate } = useFetch('/api/users')

  const handleSubmit = useCallback(async () => {
    let image
    try {
      await fetch(`/api/profile`, {
        method: 'POST',
        body: JSON.stringify(image),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(async (res: any) => {
          if (res?.status !== 201) toast.error(await res?.json())

          await mutate(...(data && (await res?.json())), {
            revalidate: true,
            rollbackOnError: true,
          })

          toast.success('a imagem foi atualizada')
        })
        .catch((error: any) => {
          console.error(error)
        })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
      console.error(error)
    } finally {
    }
  }, [data, mutate])

  return ''
}
