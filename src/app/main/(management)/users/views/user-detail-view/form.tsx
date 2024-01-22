'use client'

import { UserType } from '../../types'
import { actionUpdateUser } from './actions'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserDTO, UpdateUserDTOType } from '@/app/api/users/dto'
import { useRouter } from 'next/navigation'

interface Props {
  user: UserType
}

export default function UpdateUserForm(props: Props) {
  const { user } = props
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDTOType>({
    resolver: zodResolver(UpdateUserDTO),
  })

  const onSubmit: SubmitHandler<UpdateUserDTOType> = async (inputs) => {
    const response = await actionUpdateUser(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Select
        color="light-blue"
        label="perfil"
        name="profile"
        id="updateUserProfile"
        defaultValue={user?.profile}
      >
        <Option value="guest">guest</Option>
        <Option value="consumer">consumer</Option>
        <Option value="member">member</Option>
        <Option value="master">master</Option>
      </Select>

      <Input
        color="light-blue"
        label="nome completo"
        type="text"
        id="updateUserName"
        placeholder="nome completo"
        defaultValue={user?.name}
        crossOrigin={undefined}
        {...register('name')}
      />
      {errors && errors?.name && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.name?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="celular"
        type="number"
        id="updateUserPhone"
        placeholder="48 98765 4321"
        defaultValue={user?.phone}
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && errors?.phone && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="e-mail"
        type="email"
        id="updateUserEmail"
        placeholder="nome@email.com"
        defaultValue={user?.email}
        crossOrigin={undefined}
        {...register('email')}
      />
      {errors && errors?.email && (
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
