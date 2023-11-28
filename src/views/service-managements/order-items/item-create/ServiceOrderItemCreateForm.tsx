'use client'

import {
  OrderItemCreateDTO,
  OrderItemCreateDTOType,
} from '@/dto/order-item.dto'
import useFetch from '@/hooks/use-fetch'
import { OrderItemType } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ServiceOrderItemCreateForm() {
  const SERVICE_MANAGEMENTE_API_URL =
    process.env.NEXT_PUBLIC_SERVICE_MANAGEMENTE_API_URL!
  const { data: items, mutate } = useFetch<OrderItemType[]>(
    `${SERVICE_MANAGEMENTE_API_URL}/items`,
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrderItemCreateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrderItemCreateDTO),
  })

  const onSubmit: SubmitHandler<OrderItemCreateDTOType> = async (inputs) => {
    try {
      await fetch(`${SERVICE_MANAGEMENTE_API_URL}/items`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(items && res?.json()), {
          revalidate: true,
          rollbackOnError: true,
        })

        toast.success(await res?.json())
      })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu algo inesperado')
      console.error(error)
    } finally {
      reset
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
