'use client'

import actionCreateOrganizationUser from './actions'
import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/app/main/(management)/users/types'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {
  CreateOrganizationUserDTO,
  CreateOrganizationUserDTOType,
} from '@/app/api/organization-users/dto'

export default function CreateOrganizationUserForm() {
  const { data: users } = useFetch<UserType[] | any>('/api/users')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationUserDTOType>({
    resolver: zodResolver(CreateOrganizationUserDTO),
  })

  const onSubmit: SubmitHandler<CreateOrganizationUserDTOType> = async (
    inputs,
  ) => {
    const response = await actionCreateOrganizationUser(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-2 text-center italic"></p>
      <Select color="green" label="função" id="createOrganizationUserRole">
        <Option value="client">client</Option>
        <Option value="assistant">assistant</Option>
        <Option value="technician">technician</Option>
        <Option value="administrator">administrator</Option>
      </Select>

      <Input
        color="green"
        label="celular"
        type="number"
        id="createOrganizationUserPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
        {...register('userPhone')}
      />
      {errors && errors?.userPhone && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.userPhone?.message}
        </span>
      )}

      <Button color="green" type="submit">
        adicionar usuário
      </Button>
    </form>
  )
}
