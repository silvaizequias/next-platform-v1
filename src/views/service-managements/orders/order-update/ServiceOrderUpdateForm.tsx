'use client'

import { OrderUpdateDTO, OrderUpdateDTOType } from '@/dto/order.dto'
import useFetch from '@/hooks/use-fetch'
import { OrderType } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  order: OrderType
}

export default function ServiceOrderUpdateForm(props: Props) {
  const { order } = props
  const SERVICE_MANAGEMENTE_API_URL =
    process.env.NEXT_PUBLIC_SERVICE_MANAGEMENTE_API_URL!

  const { data: orders, mutate } = useFetch<OrderType[]>(
    `${SERVICE_MANAGEMENTE_API_URL}/orders`,
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrderUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrderUpdateDTO),
  })

  const onSubmit: SubmitHandler<OrderUpdateDTOType> = async (inputs) => {
    try {
      await fetch(`${SERVICE_MANAGEMENTE_API_URL}/orders/${order?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(orders && res?.json()), {
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
