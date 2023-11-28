'use client'

import { OrderCreateDTO, OrderCreateDTOType } from '@/dto/order.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ServiceOrderCreateForm() {
  const SERVICE_MANAGEMENTE_API_URL =
    process.env.NEXT_PUBLIC_SERVICE_MANAGEMENTE_API_URL!

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrderCreateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrderCreateDTO),
  })

  const onSubmit: SubmitHandler<OrderCreateDTOType> = async (inputs) => {
    try {
      await fetch(`${SERVICE_MANAGEMENTE_API_URL}/orders`, {
        method: 'POST',
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
