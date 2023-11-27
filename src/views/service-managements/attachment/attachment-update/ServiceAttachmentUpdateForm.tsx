'use client'

import {
  OrderAttachmentUpdateDTO,
  OrderAttachmentUpdateDTOType,
} from '@/dto/order-attachment.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ServiceAttachmentUpdateForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrderAttachmentUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrderAttachmentUpdateDTO),
  })

  const onSubmit: SubmitHandler<OrderAttachmentUpdateDTOType> = async (
    inputs,
  ) => {
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
