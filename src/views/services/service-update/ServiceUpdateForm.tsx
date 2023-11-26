'use client'

import { ServiceUpdateDTO, ServiceUpdateDTOType } from '@/dto/service.dto'
import { ServiceType } from '@/types/service'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'

interface Props {
  service: ServiceType
  services: ServiceType[]
  mutate: KeyedMutator<[]>
}

export default function ServiceUpdateForm(props: Props) {
  const { service, services, mutate } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ServiceUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(ServiceUpdateDTO),
  })

  const onSubmit: SubmitHandler<ServiceUpdateDTOType> = async (inputs) => {
    try {
      await fetch(`/api/services/${service?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(services && (await res?.json())), {
          revalidate: true,
          rollbackOnError: true,
        })

        toast.success(await res?.json())
      })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
      console.error(error)
    } finally {
      reset
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
