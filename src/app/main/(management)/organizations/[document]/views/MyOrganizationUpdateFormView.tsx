'use client'

import { Button, Input } from '@material-tailwind/react'
import { OrganizationType } from '../../types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateOrganizationDTO, UpdateOrganizationDTOType } from '../../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { actionUpdateOrganization } from '../../actions'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function MyOrganizationUpdateFormView(props: {
  data: OrganizationType
  close: () => void
}) {
  const { data: organization } = props
  const { data: session } = useSession()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrganizationDTOType>({
    resolver: zodResolver(UpdateOrganizationDTO),
    defaultValues: {
      name: organization?.name,
      email: organization?.email,
      phone: organization?.phone,
      zipCode: organization?.zipCode,
      street: organization?.street,
      complement: organization?.complement,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrganizationDTOType> = async (inputs) => {
    const result = await actionUpdateOrganization(
      session!,
      inputs,
      organization?.id,
    )
    if (result?.response?.error) {
      close()
      toast.error(result?.message)
    } else {
      close()
      toast.success(result)
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
        <span className="text-xs text-red-400 italic">
          {errors?.name?.message}
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
        <span className="text-xs text-red-400 italic">
          {errors?.email?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="telefone"
        type="number"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic">
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

      <Button type="submit" color="light-blue">
        atualizar informações
      </Button>
    </form>
  )
}
