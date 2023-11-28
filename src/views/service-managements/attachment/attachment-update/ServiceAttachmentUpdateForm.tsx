'use client'

import {
  OrderAttachmentUpdateDTO,
  OrderAttachmentUpdateDTOType,
} from '@/dto/order-attachment.dto'
import useFetch from '@/hooks/use-fetch'
import { OrderAttachmentType } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  attachment: OrderAttachmentType
}

export default function ServiceAttachmentUpdateForm(props: Props) {
  const { attachment } = props
  const SERVICE_MANAGEMENTE_API_URL =
    process.env.NEXT_PUBLIC_SERVICE_MANAGEMENTE_API_URL!

  const { data: attachments, mutate } = useFetch<OrderAttachmentType[]>(
    `${SERVICE_MANAGEMENTE_API_URL}/attachments`,
  )

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
      await fetch(
        `${SERVICE_MANAGEMENTE_API_URL}/attachments/${attachment?.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(inputs),
          headers: { 'Content-Type': 'application/json' },
        },
      ).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(attachments && res?.json()), {
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
