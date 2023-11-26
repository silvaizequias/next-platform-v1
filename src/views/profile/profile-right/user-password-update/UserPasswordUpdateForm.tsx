'use client'

import {
  UserPasswordUpdateDTO,
  UserPasswordUpdateDTOType,
} from '@/dto/user.dto'
import { UserType } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  user: UserType
}

export default function UserPasswordUpdateForm(props: Props) {
  const { user } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UserPasswordUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(UserPasswordUpdateDTO),
  })

  const onSubmit: SubmitHandler<UserPasswordUpdateDTOType> = async (inputs) => {
    try {
      await fetch(`/api/password-update`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())
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
