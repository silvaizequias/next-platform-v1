'use client'

import { Button, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { actionSubmitSignIn } from './actions'
import { useFormState } from 'react-dom'

const initialState = {}

export default function SignInForm() {
  const router = useRouter()
  const [state, formAction] = useFormState(actionSubmitSignIn, initialState)

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center gap-2"
    >
      <Typography variant="small" className="text-center lowercase p-2">
        informe suas credenciais para acessar a plataforma
      </Typography>
      <Input
        crossOrigin={undefined}
        name="phone"
        id="signInPhone"
        type="number"
        label="celular"
        required
      />
      <Input
        crossOrigin={undefined}
        name="password"
        id="signInPassword"
        type="password"
        label="senha"
        required
      />
      <Button type="submit" color="light-blue" fullWidth>
        Autenticar-se
      </Button>
    </form>
  )
}
