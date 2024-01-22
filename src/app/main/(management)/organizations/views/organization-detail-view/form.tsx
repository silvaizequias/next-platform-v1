'use client'

import { actionUpdateOrganization } from './actions'
import { OrganizationType } from '../../types'
import { Button, Input } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateOrganizationDTO,
  UpdateOrganizationDTOType,
} from '@/app/api/organizations/dto'

interface Props {
  organization: OrganizationType
}

export default function UpdateOrganizationForm(props: Props) {
  const { organization } = props

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrganizationDTOType>({
    resolver: zodResolver(UpdateOrganizationDTO),
  })

  const onSubmit: SubmitHandler<UpdateOrganizationDTOType> = async (inputs) => {
    const response = await actionUpdateOrganization(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Input
        color="light-blue"
        label="nome"
        type="text"
        id="updateOrganizationName"
        placeholder="nome da organização"
        defaultValue={organization?.name}
        crossOrigin={undefined}
        {...register('name')}
      />
      {errors && errors?.name && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.name?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="documento"
        type="text"
        id="updateOrganizationDocument"
        placeholder="documento"
        defaultValue={organization?.documentCode}
        crossOrigin={undefined}
        {...register('documentCode')}
      />
      {errors && errors?.documentCode && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.documentCode?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="telefone"
        type="number"
        id="updateOrganizationPhone"
        placeholder="48 98765 4321"
        defaultValue={organization?.phone}
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && errors?.phone && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="e-mail"
        type="email"
        id="updateOrganizationEmail"
        placeholder="organizacao@email.com"
        defaultValue={organization?.email}
        crossOrigin={undefined}
        {...register('email')}
      />
      {errors && errors?.email && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.email?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        atualizar organização
      </Button>
    </form>
  )
}
