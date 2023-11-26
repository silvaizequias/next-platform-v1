'use client'

import {
  OrganizationUserUpdateDTO,
  OrganizationUserUpdateDTOType,
} from '@/dto/organization.dto'
import useFetch from '@/hooks/use-fetch'
import { OrganizationUserType } from '@/types/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  organizationUser: OrganizationUserType
}

export default function OrganizationUserUpdateForm(props: Props) {
  const { organizationUser } = props
  const { data, mutate } = useFetch<OrganizationUserType[]>(
    '/api/organization-users',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<OrganizationUserUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(OrganizationUserUpdateDTO),
  })

  const onSubmit: SubmitHandler<OrganizationUserUpdateDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/organization-users/${organizationUser?.id}`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(data && (await res?.json())), {
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
