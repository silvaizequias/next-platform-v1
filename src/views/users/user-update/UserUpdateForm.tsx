'use client'

import { UserUpdateDTO, UserUpdateDTOType } from '@/dto/user.dto'
import { UserType } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'

interface Props {
  user: UserType
  users: UserType[]
  mutate: KeyedMutator<[]>
}

export default function UserUpdateForm(props: Props) {
  const { user, users, mutate } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UserUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(UserUpdateDTO),
  })

  const onSubmit: SubmitHandler<UserUpdateDTOType> = async (inputs) => {
    try {
      await fetch(`/api/users/${user?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(users && (await res?.json())), {
          revalidate: true,
          rollbackOnError: true,
        })

        toast.success(await res?.json())
      })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
      console.error(error)
    } finally {
      reset
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
