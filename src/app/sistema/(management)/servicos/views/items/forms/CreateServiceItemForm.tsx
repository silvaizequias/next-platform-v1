'use client'

import {
  CreateServiceItemDTO,
  CreateServiceItemDTOType,
} from '@/app/api/service-management/items/dto'
import useFetch from '@/hooks/use-fetch'
import { ServiceItemType } from '@/types/service-management/item'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
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
          <input
            className="rounded-md"
            name="orderId"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'código da os'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.orderId?.message}
        </span>
      )}

      <Controller
        {...register('note')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <textarea
            className="rounded-md"
            name="note"
            rows={5}
            value={value}
            onChange={onChange}
            placeholder={'observação'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.note?.message}
        </span>
      )}

      <Controller
        {...register('amount')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="amount"
            type="number"
            value={value}
            onChange={onChange}
            placeholder={'0'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.amount?.message}
        </span>
      )}

      <Controller
        {...register('file')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="file"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'arquivo'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.file?.message}
        </span>
      )}

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Adicionar Item
      </Button>
    </form>
  )
}
