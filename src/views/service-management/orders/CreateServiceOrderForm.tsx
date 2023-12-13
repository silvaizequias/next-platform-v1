'use client'

import {
  CreateServiceOrderDTO,
  CreateServiceOrderDTOType,
} from '@/app/api/service-management/orders/dto'
import useFetch from '@/hooks/use-fetch'
import { ServiceOrderType } from '@/types/service-management/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateServiceOrderForm() {
  const { data: serviceOrder, mutate } = useFetch<ServiceOrderType[] | any>(
    '/api/service-management/orders',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateServiceOrderDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateServiceOrderDTO),
  })

  const onSubmit: SubmitHandler<CreateServiceOrderDTOType> = async (inputs) => {
    try {
      await fetch(`/api/service-management/orders`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...serviceOrder, data, {
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
        {...register('organization')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="organization"
            type="text"
            label="Organização"
            errorMessage={errors.organization?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('customer')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="customer"
            type="text"
            label="Cliente"
            errorMessage={errors.customer?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('deadline')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="deadline"
            type="date"
            label="Prazo final"
            errorMessage={errors.deadline?.message}
            //value={value}
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
        Criar Ordem de Serviço
      </Button>
    </form>
  )
}
