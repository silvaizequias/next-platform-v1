'use client'

import {
  CreateSupportAttachmentDTO,
  CreateSupportAttachmentDTOType,
} from '@/app/api/support-management/attachments/dto'
import useFetch from '@/hooks/use-fetch'
import { SupportAttachmentType } from '@/types/support-management/attachment'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@mui/base'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateSupportAttachmentForm() {
  const { data: supportAttachments, mutate } = useFetch<
    SupportAttachmentType[] | any
  >('/api/support-management/attachments')

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateSupportAttachmentDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateSupportAttachmentDTO),
  })

  const onSubmit: SubmitHandler<CreateSupportAttachmentDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/support-management/attachments`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...supportAttachments, data, {
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
          <Input
            name="ticketId"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('note')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input name="note" type="text" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('file')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input name="file" type="text" value={value} onChange={onChange} />
        )}
      />

      <Button color="primary" className="w-full uppercase" type="submit">
        Anexar
      </Button>
    </form>
  )
}
