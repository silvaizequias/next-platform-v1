'use client'

import { Button, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { actionSubmitSignUp } from './actions'

export default function SignUpForm() {
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await actionSubmitSignUp(formData)
  }

  return (
    <form className="flex flex-col justify-center items-center gap-2">
      <Typography variant="small" className="text-center lowercase p-2">
        preencha os campos para se registrar na plataforma
      </Typography>
      <Input
        crossOrigin={undefined}
        name="name"
        id="signUpName"
        type="text"
        label="nome completo"
        required
      />
      <Input
        crossOrigin={undefined}
        name="phone"
        id="signUpPhone"
        type="number"
        label="celular"
        required
      />
      <Input
        crossOrigin={undefined}
        name="email"
        id="signUpEmail"
        type="email"
        label="e-mail"
        required
      />
      <Button color="light-green" fullWidth>
        Registrar-se
      </Button>
    </form>
  )
}
