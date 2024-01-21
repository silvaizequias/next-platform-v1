'use client'

import { useFormState } from 'react-dom'
import { actionSignIn } from './actions'
import { Button, Input } from '@material-tailwind/react'

const initialState = {}

export default function SignInForm() {
  const [state, formAction] = useFormState(actionSignIn, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic">
        informe suas credenciais para autenticar-se na plataforma
      </p>
      <Input
        color="light-blue"
        label="celular"
        type="number"
        name="phone"
        id="signInPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
      />
      <Input
        color="light-blue"
        label="senha"
        type="password"
        name="password"
        id="signInPassword"
        placeholder="s*e*n*h*a"
        crossOrigin={undefined}
      />
      <Button color="light-blue" type="submit">
        autenticar-se
      </Button>
    </form>
  )
}
