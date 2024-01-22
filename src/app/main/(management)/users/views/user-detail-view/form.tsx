'use client'

import { useFormState } from 'react-dom'
import { UserType } from '../../types'
import { actionUpdateUser } from './actions'
import { Button, Input, Option, Select } from '@material-tailwind/react'

interface Props {
  user: UserType
}

const initialState = {}

export default function UpdateUserForm(props: Props) {
  const { user } = props
  const [state, formAction] = useFormState(actionUpdateUser, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <Select
        color="light-blue"
        label="perfil"
        name="profile"
        id="updateUserProfile"
        defaultValue={user?.profile}
      >
        <Option value="guest">guest</Option>
        <Option value="consumer">consumer</Option>
        <Option value="member">member</Option>
        <Option value="master">master</Option>
      </Select>
      <Input
        color="light-blue"
        label="nome completo"
        type="text"
        name="name"
        id="updateUserName"
        placeholder="nome completo"
        defaultValue={user?.name}
        crossOrigin={undefined}
      />
      <Input
        color="light-blue"
        label="celular"
        type="number"
        name="phone"
        id="updateUserPhone"
        placeholder="48 98765 4321"
        defaultValue={user?.phone}
        crossOrigin={undefined}
      />
      <Input
        color="light-blue"
        label="e-mail"
        type="email"
        name="email"
        id="updateUserEmail"
        placeholder="nome@email.com"
        defaultValue={user?.email}
        crossOrigin={undefined}
      />
      <Button color="light-blue" type="submit">
        atualizar usuário
      </Button>
    </form>
  )
}
