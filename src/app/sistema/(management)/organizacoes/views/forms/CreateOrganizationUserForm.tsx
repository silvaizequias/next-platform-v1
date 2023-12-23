'use client'

import {
  CreateOrganizationUserDTO,
  CreateOrganizationUserDTOType,
} from '@/app/api/platform-management/organization-users/dto'
import useFetch from '@/hooks/use-fetch'
import { OrganizationUserType } from '@/types/platform-management/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  organizationId: string
}

export default function CreateOrganizationUserForm(props: Props) {
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
        body: JSON.stringify({
          organizationId: props.organizationId,
          role: inputs?.role,
          userId: inputs?.userId,
        }),
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
        {...register('userId')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="userId"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'Usuário'}
          />
        )}
      />

      <Controller
        {...register('role')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="role"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'Função do Usuário'}
          />
        )}
      />

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Adicionar Usuário
      </Button>
    </form>
  )
}
