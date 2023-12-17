'use client'

import {
  CreateOrganizationUserDTO,
  CreateOrganizationUserDTOType,
} from '@/app/api/platform-management/organization-users/dto'
import useFetch from '@/hooks/use-fetch'
import { OrganizationUserType } from '@/types/platform-management/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateOrganizationUserForm() {
  const { data: organizationUsers, mutate } = useFetch<
    OrganizationUserType[] | any
  >('/api/platform-management/organization-users')

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateOrganizationUserDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateOrganizationUserDTO),
  })

  const onSubmit: SubmitHandler<CreateOrganizationUserDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/platform-management/organization-users`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...organizationUsers, data, {
            revalidate: true,
            rollbackOnError: true,
          })

          reset(inputs)
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
        {...register('organizationId')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="organizationId"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('userId')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="userId" type="text" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('role')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="role" type="text" value={value} onChange={onChange} />
        )}
      />

      <button color="primary" className="w-full uppercase" type="submit">
        Adicionar Usuário
      </button>
    </form>
  )
}
