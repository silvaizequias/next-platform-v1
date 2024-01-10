'use client'

import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { actionSetUpdateUser } from '../actions'
import { Button, Input } from '@material-tailwind/react'

const initialState = {}

export default function UserUpdateFormView() {
  const router = useRouter()
  const [state, formAction] = useFormState(actionSetUpdateUser, initialState)

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center gap-2"
    >
      <Input
        crossOrigin={undefined}
        name="name"
        id="createUserName"
        type="text"
        label="nome completo"
        required
      />
      <Input
        crossOrigin={undefined}
        name="phone"
        id="createUserPhone"
        type="number"
        label="celular"
        required
      />
      <Input
        crossOrigin={undefined}
        name="email"
        id="createUserEmail"
        type="email"
        label="e-mail"
        required
      />
      <Button type="submit" color="light-blue" fullWidth>
        atualizar usuário
      </Button>
    </form>
  )
}
