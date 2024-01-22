'use client'

import { useFormState } from 'react-dom'
import actionCreateOrganizationUser from './actions'
import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/app/main/(management)/users/types'
import { Button, Input, Option, Select } from '@material-tailwind/react'

const initialState = {}

export default function CreateOrganizationUserForm() {
  const { data: users } = useFetch<UserType[] | any>('/api/users')
  const [state, formAction] = useFormState(
    actionCreateOrganizationUser,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-2 text-center italic"></p>
      <Select
        color="green"
        label="função"
        name="userRole"
        id="createOrganizationUserRole"
      >
        <Option value="client">client</Option>
        <Option value="assistant">assistant</Option>
        <Option value="technician">technician</Option>
        <Option value="administrator">administrator</Option>
      </Select>

      <Input
        color="green"
        label="celular"
        type="number"
        name="userPhone"
        id="createOrganizationUserPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
      />
      <span className="text-xs font-thin italic">{}</span>

      <Button color="green" type="submit">
        adicionar usuário
      </Button>
    </form>
  )
}
