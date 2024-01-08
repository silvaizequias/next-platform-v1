'use client'

import { Button, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
  const router = useRouter()

  return (
    <form className="flex flex-col justify-center items-center gap-2">
      <Typography variant="small" className="text-center lowercase p-2">
        informe suas credenciais para acessar a plataforma
      </Typography>
      <Input
        crossOrigin={undefined}
        name="phone"
        id="phone"
        type="number"
        label="celular"
        required
      />
      <Input
        crossOrigin={undefined}
        name="password"
        id="password"
        type="password"
        label="senha"
        required
      />
      <Button color="light-blue" fullWidth>
        Autenticar-se
      </Button>
    </form>
  )
}
