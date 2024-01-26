'use client'

import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateUserDTO, CreateUserDTOType } from '../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { actionCreateUser } from '../actions'
import toast from 'react-hot-toast'
import { Button, Input } from '@material-tailwind/react'

export default function UserCreateFormView({ close }: { close: boolean }) {
  const { data: session } = useSession()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateUserDTOType>({
    resolver: zodResolver(CreateUserDTO),
  })
  const onSubmit: SubmitHandler<CreateUserDTOType> = async (inputs) => {
    const result = await actionCreateUser(session!, inputs)
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="profile">escolher um perfil</label>
      <select
        {...register('profile')}
        id="profile"
        className="block peer w-full rounded"
      >
        <option value={'guest'}>visitante</option>
        <option value={'consumer'}>consumidor</option>
        <option value={'member'}>membro</option>
        <option value={'master'}>master</option>
      </select>

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

      <Input
        color="light-blue"
        label="senha"
        type="password"
        defaultValue={undefined}
        crossOrigin={undefined}
        {...register('password')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.password?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        criar usuário
      </Button>
    </form>
  )
}
