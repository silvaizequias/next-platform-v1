'use client'

import { useFormState } from 'react-dom'
import { OrganizationUsersType } from '../../../types'
import actionUpdateOrganizationUser from './actions'
import { Button, Option, Select } from '@material-tailwind/react'

interface Props {
  organizationUser: OrganizationUsersType
}

const initialState = {}

export default function UpdateOrganizationUserForm(props: Props) {
  const { organizationUser } = props
  const [state, formAction] = useFormState(
    actionUpdateOrganizationUser,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
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

      <span className="text-xs font-thin italic">{}</span>

      <Button color="light-blue" type="submit">
        atualizar usuário
      </Button>
    </form>
  )
}
