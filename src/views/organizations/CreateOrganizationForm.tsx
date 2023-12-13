'use client'

import {
  CreateOrganizationDTO,
  CreateOrganizationDTOType,
} from '@/app/api/platform-management/organizations/dto'
import useFetch from '@/hooks/use-fetch'
import { OrganizationType } from '@/types/platform-management/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateOrganizationForm() {
  const { data: organizations, mutate } = useFetch<OrganizationType[] | any>(
    '/api/platform-management/organizations',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateOrganizationDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateOrganizationDTO),
  })

  const onSubmit: SubmitHandler<CreateOrganizationDTOType> = async (inputs) => {
    try {
      await fetch(`/api/platform-management/organizations`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...organizations, data, {
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
        {...register('name')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="name"
            type="text"
            label="Nome da Organização"
            errorMessage={errors.name?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('documentCode')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="documentCode"
            type="number"
            label="CNPJ"
            errorMessage={errors.documentCode?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button
        size="sm"
        variant="flat"
        color="warning"
        className="w-full uppercase"
        type="submit"
      >
        Criar Organização
      </Button>
    </form>
  )
}
