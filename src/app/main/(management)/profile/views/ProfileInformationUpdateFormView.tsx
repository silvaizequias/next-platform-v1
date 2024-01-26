'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { UserProps } from '../../users/types'
import {
  UpdateProfileInformationDTO,
  UpdateProfileInformationDTOType,
} from '../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'

export default function ProfileInformationUpdateFormView(props: UserProps) {
  const { data: profile } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateProfileInformationDTOType>({
    resolver: zodResolver(UpdateProfileInformationDTO),
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      document: profile?.document,
      zipCode: profile?.zipCode,
      street: profile?.street,
      complement: profile?.complement,
    },
  })
  const onSubmit: SubmitHandler<UpdateProfileInformationDTOType> = async (
    inputs,
  ) => {
    console.log(inputs)
  }

  return (
    <form
      className="w-full flex flex-col gap-4 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        color="light-blue"
        label="nome completo"
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
        label="cep"
        type="text"
        crossOrigin={undefined}
        {...register('zipCode')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
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
        <span className="text-xs text-red-400 italic font-thin">
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
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.complement?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        atualizar informações
      </Button>
    </form>
  )
}
