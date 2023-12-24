'use client'

import {
  CreateUserDTO,
  CreateUserDTOType,
} from '@/app/api/platform-management/users/dto'
import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/types/platform-management/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateUserForm() {
  const { data: users, mutate } = useFetch<UserType[] | any>(
    '/api/platform-management/users',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateUserDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateUserDTO),
  })

  const onSubmit: SubmitHandler<CreateUserDTOType> = async (inputs) => {
    try {
      await fetch(`/api/platform-management/users`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...users, data, {
            revalidate: true,
            rollbackOnError: true,
          })

          toast.success(data)
        } else {
          toast.error(data)
        }
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    } finally {
      reset(inputs)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <Controller
        {...register('profile')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            color="green"
            size="md"
            label={'perfil'}
            name="profile"
            value={value}
            onChange={onChange}
          >
            <Option value={'USER'}>user</Option>
            <Option value={'MASTER'}>master</Option>
          </Select>
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.profile?.message}
        </span>
      )}

      <Controller
        {...register('name')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            crossOrigin={undefined}
            color="green"
            size="md"
            label={'nome completo'}
            name="name"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.name?.message}
        </span>
      )}

      <Controller
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            crossOrigin={undefined}
            color="green"
            size="md"
            label={'e-mail'}
            name="email"
            type="email"
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.email?.message}
        </span>
      )}

      <Controller
        {...register('phone')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            crossOrigin={undefined}
            color="green"
            size="md"
            label={'celular'}
            name="phone"
            type="number"
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.phone?.message}
        </span>
      )}

      <Button
        variant="gradient"
        color="green"
        size="sm"
        fullWidth
        type="submit"
      >
        Criar Usuário
      </Button>
    </form>
  )
}
