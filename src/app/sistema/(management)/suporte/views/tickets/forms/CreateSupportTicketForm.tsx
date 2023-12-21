'use client'

import {
  CreateSupportTicketDTO,
  CreateSupportTicketDTOType,
} from '@/app/api/support-management/tickets/dto'
import useFetch from '@/hooks/use-fetch'
import { SupportTicketType } from '@/types/support-management/ticket'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateSupportTicketForm() {
  const { data: supportTickets, mutate } = useFetch<SupportTicketType[] | any>(
    '/api/support-management/tickets',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateSupportTicketDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateSupportTicketDTO),
  })

  const onSubmit: SubmitHandler<CreateSupportTicketDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/support-management/tickets`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...supportTickets, data, {
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
          <input
            className="rounded-md"
            name="organization"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'organizacao'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.organization?.message}
        </span>
      )}

      <Controller
        {...register('subject')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="subject"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={'assunto'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.subject?.message}
        </span>
      )}

      <Controller
        {...register('content')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <textarea
            className="rounded-md"
            name="content"
            rows={10}
            value={value}
            onChange={onChange}
            placeholder={'conteúdo'}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.content?.message}
        </span>
      )}

      <button
        className="mt-2 w-full uppercase rounded-md bg-sky-600 hover:opacity-75 py-2 text-white text-base hover:font-medium"
        type="submit"
      >
        Criar Ticket
      </button>
    </form>
  )
}
