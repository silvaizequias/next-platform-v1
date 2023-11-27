'use client'

import {
  OrderItemUpdateDTO,
  OrderItemUpdateDTOType,
} from '@/dto/order-item.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ServiceOrderItemUpdateForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrderItemUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrderItemUpdateDTO),
  })

  const onSubmit: SubmitHandler<OrderItemUpdateDTOType> = async (inputs) => {
    try {
      await fetch(``, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())
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
