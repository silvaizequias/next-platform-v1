'use client'

import { useFormState } from 'react-dom'
import { actionSignUp } from './actions'
import { Button, Input } from '@material-tailwind/react'

const initialState = {}

export default function SignUpForm() {
  const [state, formAction] = useFormState(actionSignUp, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic">
        preencha os campos do formulário para registrar-se na plataforma
      </p>
      <Input
        color="green"
        label="nome completo"
        type="text"
        name="name"
        id="signUpName"
        placeholder="seu nome completo"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="celular"
        type="number"
        name="phone"
        id="signUpPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="e-mail"
        type="email"
        name="email"
        id="signUpEmail"
        placeholder="seu@email.com"
        crossOrigin={undefined}
      />

      <Button color="green" type="submit">
        registrar-se
      </Button>
    </form>
  )
}
