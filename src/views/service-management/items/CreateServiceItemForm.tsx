'use client'

import {
  CreateServiceItemDTO,
  CreateServiceItemDTOType,
} from '@/app/api/service-management/items/dto'
import useFetch from '@/hooks/use-fetch'
import { ServiceItemType } from '@/types/service-management/item'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateServiceItemForm() {
  const { data: serviceItems, mutate } = useFetch<ServiceItemType[] | any>(
    '/api/service-management/items',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateServiceItemDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateServiceItemDTO),
  })

  const onSubmit: SubmitHandler<CreateServiceItemDTOType> = async (inputs) => {
    try {
      await fetch(`/api/service-management/items`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...serviceItems, data, {
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
        {...register('orderId')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="orderId" type="text" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('note')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="note" type="text" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('amount')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="amount"
            type="number"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('file')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="file" type="text" value={value} onChange={onChange} />
        )}
      />

      <button className="w-full uppercase" type="submit">
        Adicionar Item
      </button>
    </form>
  )
}
