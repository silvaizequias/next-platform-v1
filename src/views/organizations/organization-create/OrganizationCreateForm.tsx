'use client'

import {
  OrganizationCreateDTO,
  OrganizationCreateDTOType,
} from '@/dto/organization.dto'
import { OrganizationType } from '@/types/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'

interface Props {
  organizations: OrganizationType[]
  mutate: KeyedMutator<[]>
}

export default function OrganizationCreateForm(props: Props) {
  const { organizations, mutate } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrganizationCreateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrganizationCreateDTO),
  })

  const onSubmit: SubmitHandler<OrganizationCreateDTOType> = async (inputs) => {
    try {
      await fetch('/api/organizations', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(organizations && (await res?.json())), {
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
