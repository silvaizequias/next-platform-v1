'use client'

import { useRouter } from 'next/navigation'
import { actionCreateOrganization } from './actions'
import { Button, Input } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateOrganizationDTOType, CreateOrganizationDTO } from '../../dto'

export default function CreateOrganizationForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationDTOType>({
    resolver: zodResolver(CreateOrganizationDTO),
  })

  const onSubmit: SubmitHandler<CreateOrganizationDTOType> = async (inputs) => {
    const response = await actionCreateOrganization(inputs)
    console.log(response)
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
        criar organização
      </Button>
    </form>
  )
}
