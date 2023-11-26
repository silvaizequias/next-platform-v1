'use client'

import {
  OrganizationUpdateDTO,
  OrganizationUpdateDTOType,
} from '@/dto/organization.dto'
import { OrganizationType } from '@/types/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'

interface Props {
  organization: OrganizationType
  organizations: OrganizationType[]
  mutate: KeyedMutator<[]>
}

export default function OrganizationUpdateForm(props: Props) {
  const { organization, organizations, mutate } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrganizationUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrganizationUpdateDTO),
  })

  const onSubmit: SubmitHandler<OrganizationUpdateDTOType> = async (inputs) => {
    try {
      await fetch(`/api/organizations/${organization?.id}`, {
        method: 'PATCH',
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
