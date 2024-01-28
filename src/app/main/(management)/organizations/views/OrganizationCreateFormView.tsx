'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateOrganizationDTO, CreateOrganizationDTOType } from '../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { Button, Input } from '@material-tailwind/react'
import { actionCreateOrganization } from '../actions'
import toast from 'react-hot-toast'

export default function OrganizationCreateFormView({
  close,
}: {
  close: () => void
}) {
  const { data: session } = useSession()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrganizationDTOType>({
    resolver: zodResolver(CreateOrganizationDTO),
  })
  const onSubmit: SubmitHandler<CreateOrganizationDTOType> = async (inputs) => {
    const result = await actionCreateOrganization(session!, inputs)
    if (result?.response?.error) {
      close()
      toast.error(result?.message)
    } else {
      toast.success(result)
      close()
    }
  }
  return (
    <form
      className="w-full flex flex-col gap-2 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        color="light-blue"
        label="nome"
        type="text"
        crossOrigin={undefined}
        {...register('name')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.name?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="documento"
        type="text"
        crossOrigin={undefined}
        {...register('document')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.document?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="e-mail"
        type="email"
        crossOrigin={undefined}
        {...register('email')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.email?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="celular"
        type="number"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="cep"
        type="text"
        crossOrigin={undefined}
        {...register('zipCode')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic">
          {errors?.zipCode?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="logradouro"
        type="text"
        crossOrigin={undefined}
        {...register('street')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic">
          {errors?.street?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="complemento"
        type="text"
        crossOrigin={undefined}
        {...register('complement')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic">
          {errors?.complement?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        criar organização
      </Button>
    </form>
  )
}
