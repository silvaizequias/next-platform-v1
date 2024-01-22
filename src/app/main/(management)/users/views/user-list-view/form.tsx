'use client'

import { actionCreateUser } from './actions'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserDTO, CreateUserDTOType } from '@/app/api/users/dto'

export default function CreateUserForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDTOType>({
    resolver: zodResolver(CreateUserDTO),
  })

  const onSubmit: SubmitHandler<CreateUserDTOType> = async (inputs) => {
    const response = await actionCreateUser(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Select color="green" label="perfil" id="createUserProfile">
        <Option value="guest">guest</Option>
        <Option value="consumer">consumer</Option>
        <Option value="member">member</Option>
        <Option value="master">master</Option>
      </Select>

      <Input
        color="green"
        label="nome completo"
        type="text"
        id="createUserName"
        placeholder="nome completo"
        crossOrigin={undefined}
        {...register('name')}
      />
      {errors && errors?.name && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.name?.message}
        </span>
      )}

      <Input
        color="green"
        label="celular"
        type="number"
        id="createUserPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && errors?.phone && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="green"
        label="e-mail"
        type="email"
        id="createUserEmail"
        placeholder="nome@email.com"
        crossOrigin={undefined}
        {...register('email')}
      />
      {errors && errors?.email && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.email?.message}
        </span>
      )}

      <Input
        color="green"
        label="senha"
        type="password"
        id="createUserPassword"
        placeholder="s*e*n*h*a"
        crossOrigin={undefined}
        {...register('password')}
      />
      {errors && errors?.password && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.password?.message}
        </span>
      )}

      <Button color="green" type="submit">
        criar usuário
      </Button>
    </form>
  )
}
