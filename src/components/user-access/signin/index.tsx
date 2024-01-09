'use client'

import { Button, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { actionSubmitSignIn } from './actions'

export default function SignInForm() {
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await actionSubmitSignIn(formData)
  }

  return (
    <form
      onSubmit={onSubmit}
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
