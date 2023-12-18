'use client'

import {
  CreateSupportMessageDTO,
  CreateSupportMessageDTOType,
} from '@/app/api/support-management/messages/dto'
import useFetch from '@/hooks/use-fetch'
import { SupportMessageType } from '@/types/support-management/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateSupportMessageForm() {
  const { data: supportMessages, mutate } = useFetch<
    SupportMessageType[] | any
  >('/api/support-management/messages')

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateSupportMessageDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateSupportMessageDTO),
  })

  const onSubmit: SubmitHandler<CreateSupportMessageDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/support-management/messages`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...supportMessages, data, {
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
        {...register('ticketId')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="ticketId"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('to')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="to" type="text" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('content')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="content" type="text" value={value} onChange={onChange} />
        )}
      />

      <button className="w-full uppercase" type="submit">
        Enviar Mensagem
      </button>
    </form>
  )
}
