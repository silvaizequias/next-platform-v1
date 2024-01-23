'use client'

import { useRouter } from 'next/navigation'
import { OrganizationUsersType } from '../../../types'
import actionUpdateOrganizationUser from './actions'
import { Button, Option, Select } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateOrganizationUserDTOType,
  UpdateOrganizationUserDTO,
} from '../../../dto'

interface Props {
  organizationUser: OrganizationUsersType
}

export default function UpdateOrganizationUserForm(props: Props) {
  const { organizationUser } = props
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrganizationUserDTOType>({
    resolver: zodResolver(UpdateOrganizationUserDTO),
  })

  const onSubmit: SubmitHandler<UpdateOrganizationUserDTOType> = async (
    inputs,
  ) => {
    const response = await actionUpdateOrganizationUser(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-2 text-center italic"></p>
      <Select
        color="light-blue"
        label="função"
        name="userRole"
        id="updateOrganizationUserRole"
        defaultValue={organizationUser?.role}
      >
        <Option value="client">client</Option>
        <Option value="assistant">assistant</Option>
        <Option value="technician">technician</Option>
        <Option value="administrator">administrator</Option>
        <Option value="owner">owner</Option>
      </Select>

      <Select
        color="light-blue"
        label="status"
        name="active"
        id="updateOrganizationUserActive"
      >
        <Option value="true">ativo</Option>
        <Option value="false">inativo</Option>
      </Select>

      <Button color="light-blue" type="submit">
        atualizar usuário
      </Button>
    </form>
  )
}
