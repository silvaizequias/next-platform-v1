'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  UpdateProfileInformationDTO,
  UpdateProfileInformationDTOType,
} from '../../dto'
import { actionUpdateProfileInformation } from './actions'
import { UserType } from '../../../users/types'

interface Props {
  user: UserType
}

export default function ProfileInformationForm(props: Props) {
  const { user } = props
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInformationDTOType>({
    resolver: zodResolver(UpdateProfileInformationDTO),
  })

  const onSubmit: SubmitHandler<UpdateProfileInformationDTOType> = async (
    inputs,
  ) => {
    const response = await actionUpdateProfileInformation(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full gap-2 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="pb-2 text-center italic">
        {' '}
        mantenha suas informações atualizadas
      </p>
      <div className="flex flex-col sm:flex-row justify-around gap-2">
        <Input
          color="light-blue"
          label="nome completo"
          crossOrigin={undefined}
          defaultValue={user?.name}
          {...register('name')}
        />
        {errors && errors?.name && (
          <span className="text-xs text-red-400 italic font-thin">
            {errors?.name?.message}
          </span>
        )}

        <Input
          color="light-blue"
          label={user?.documentType || 'cpf'}
          crossOrigin={undefined}
          defaultValue={user?.documentCode}
          {...register('documentCode')}
        />
        {errors && errors?.documentCode && (
          <span className="text-xs text-red-400 italic font-thin">
            {errors?.documentCode?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-2">
        <Input
          color="light-blue"
          label="e-mail"
          crossOrigin={undefined}
          defaultValue={user?.email}
          {...register('email')}
        />
        {errors && errors?.email && (
          <span className="text-xs text-red-400 italic font-thin">
            {errors?.email?.message}
          </span>
        )}

        <Input
          color="light-blue"
          label="celular"
          crossOrigin={undefined}
          defaultValue={user?.phone}
          {...register('phone')}
        />
        {errors && errors?.phone && (
          <span className="text-xs text-red-400 italic font-thin">
            {errors?.phone?.message}
          </span>
        )}
      </div>
      <div className="border border-dashed border-opacity-40 border-sky-800 m-4"></div>

      <div className="flex flex-col sm:flex-row justify-around gap-2">
        <div className="w-full sm:w-1/3">
          <Input
            color="light-blue"
            label="cep"
            crossOrigin={undefined}
            defaultValue={user?.zipCode}
            {...register('zipCode')}
          />
          {errors && errors?.zipCode && (
            <span className="text-xs text-red-400 italic font-thin">
              {errors?.zipCode?.message}
            </span>
          )}
        </div>
        <div className="w-full sm:w-2/3">
          <Input
            color="light-blue"
            label="logradouro"
            crossOrigin={undefined}
            defaultValue={user?.street}
            {...register('street')}
          />
          {errors && errors?.street && (
            <span className="text-xs text-red-400 italic font-thin">
              {errors?.street?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-2">
        <Input
          color="light-blue"
          label="complemento"
          crossOrigin={undefined}
          defaultValue={user?.complement}
          {...register('complement')}
        />
        {errors && errors?.complement && (
          <span className="text-xs text-red-400 italic font-thin">
            {errors?.complement?.message}
          </span>
        )}
      </div>

      <Button color="light-blue" type="submit">
        atualizar informações
      </Button>
    </form>
  )
}
