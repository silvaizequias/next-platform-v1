'use client'

import { useSession } from 'next-auth/react'
import { UserType } from '../types'
import { UpdateUserDTO, UpdateUserDTOType } from '../dto'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { actionUpdateUser } from '../actions'
import { Button, Input } from '@material-tailwind/react'

export default function UserUpdateFormView(props: {
  data: UserType
  close: () => void
}) {
  const { data: user, close } = props
  const { data: session } = useSession()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateUserDTOType>({
    resolver: zodResolver(UpdateUserDTO),
    defaultValues: {
      //active: user?.active,
      //suspended: user?.suspended,
      //profile: user?.profile,
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  })
  const onSubmit: SubmitHandler<UpdateUserDTOType> = async (inputs) => {
    const result = await actionUpdateUser(session!, inputs, user?.id)
    if (result?.response?.error) {
      close()
      toast.error(result?.message)
    } else {
      toast.success(result)
      close()
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        color="light-blue"
        label="nome completo"
        type="text"
        crossOrigin={undefined}
        {...register('name')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.name?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="celular"
        type="number"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="e-mail"
        type="email"
        crossOrigin={undefined}
        {...register('email')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.email?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        atualizar usuário
      </Button>
    </form>
  )
}
