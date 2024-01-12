'use client'

import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { actionSetCreateUser } from '../actions'
import { Button, Input } from '@material-tailwind/react'

const initialState = {}

export default function UserCreateFormView() {
  const router = useRouter()
  const [state, formAction] = useFormState(actionSetCreateUser, initialState)

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
      <Button type="submit" color="light-green" fullWidth>
        criar usuário
      </Button>
    </form>
  )
}
