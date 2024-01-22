'use client'

import { Button, Input } from '@material-tailwind/react'
import { actionCreateMyOrganization } from './actions'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateOrganizationDTO,
  CreateOrganizationDTOType,
} from '@/app/api/organizations/dto'
import { Session } from 'next-auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/use-fetch'

interface Props {
  session: Session
}

export default function CreateMyOrganizationForm(props: Props) {
  const { data: organizationUsers, mutate } = useFetch(
    '/api/organization-users',
  )
  const { session } = props
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationDTOType>({
    resolver: zodResolver(CreateOrganizationDTO),
  })

  const onSubmit: SubmitHandler<CreateOrganizationDTOType> = async (inputs) => {
    const { status, data, message }: any = await actionCreateMyOrganization(
      inputs,
      session,
    )
    if (status !== 201) {
      toast.error('ocorreu um erro inesperado!')
    } else {
      await mutate(organizationUsers, ...data, {
        revalidate: true,
        rollbackOnError: true,
      })
      toast.success(message)
      router.refresh()
    }
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Input
        color="green"
        label="nome"
        type="text"
        id="createOrganizationName"
        placeholder="nome da organização"
        crossOrigin={undefined}
        {...register('name')}
      />
      {errors && errors?.name && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.name?.message}
        </span>
      )}

      <Input
        color="green"
        label="documento"
        type="text"
        id="createOrganizationDocument"
        placeholder="documento"
        crossOrigin={undefined}
        {...register('documentCode')}
      />
      {errors && errors?.documentCode && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.documentCode?.message}
        </span>
      )}

      <Input
        color="green"
        label="telefone"
        type="number"
        id="createOrganizationPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && errors?.phone && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="green"
        label="e-mail"
        type="email"
        id="createOrganizationEmail"
        placeholder="organização@email.com"
        crossOrigin={undefined}
        {...register('email')}
      />
      {errors && errors?.email && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.email?.message}
        </span>
      )}

      <Button color="green" type="submit">
        criar minha organização
      </Button>
    </form>
  )
}
