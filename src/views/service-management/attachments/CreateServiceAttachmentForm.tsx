'use client'

import {
  CreateServiceAttachmentDTO,
  CreateServiceAttachmentDTOType,
} from '@/app/api/service-management/attachments/dto'
import useFetch from '@/hooks/use-fetch'
import { ServiceAttachmentType } from '@/types/service-management/attachment'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateServiceAttachmentForm() {
  const { data: serviceAttachments, mutate } = useFetch<
    ServiceAttachmentType[] | any
  >('/api/service-management/attachments')

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateServiceAttachmentDTOType>({
    mode: 'all',
    resolver: zodResolver(CreateServiceAttachmentDTO),
  })

  const onSubmit: SubmitHandler<CreateServiceAttachmentDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/service-management/attachments`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...serviceAttachments, data, {
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
          <Input
            variant="underlined"
            size="sm"
            name="orderId"
            type="text"
            label="Código da OS"
            errorMessage={errors.orderId?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('note')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="note"
            type="text"
            label="Observação"
            errorMessage={errors.note?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('file')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="file"
            type="text"
            label="URL do Arquivo"
            errorMessage={errors.file?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button
        size="sm"
        variant="flat"
        color="warning"
        className="w-full uppercase"
        type="submit"
      >
        Adicionar Anexo
      </Button>
    </form>
  )
}
