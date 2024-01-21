'use client'

import { useFormState } from 'react-dom'
import { actionCreateUser } from './actions'
import { Button, Input, Option, Select } from '@material-tailwind/react'

const initialState = {}

export default function CreateUserForm() {
  const [state, formAction] = useFormState(actionCreateUser, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <Select
        color="green"
        label="perfil"
        name="profile"
        id="createUserProfile"
      >
        <Option value="guest">guest</Option>
        <Option value="consumer">consumer</Option>
        <Option value="member">member</Option>
        <Option value="master">master</Option>
      </Select>
      <Input
        color="green"
        label="nome completo"
        type="text"
        name="name"
        id="createUserName"
        placeholder="nome completo"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="celular"
        type="number"
        name="phone"
        id="createUserPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="e-mail"
        type="email"
        name="email"
        id="createUserEmail"
        placeholder="nome@email.com"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="senha"
        type="password"
        name="password"
        id="createUserPassword"
        placeholder="s*e*n*h*a"
        crossOrigin={undefined}
      />

      <Button color="green" type="submit">
        criar usuário
      </Button>
    </form>
  )
}
