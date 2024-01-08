'use client'

import { Button, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
  const router = useRouter()
  
  return (
    <form className="flex flex-col justify-center items-center gap-2">
      <Typography variant="small" className='text-center lowercase p-2'>
        preencha os campos para se registrar na plataforma
      </Typography>
      <Input
        crossOrigin={undefined}
        name="name"
        id="name"
        type="text"
        label="nome completo"
        required
      />
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
        name="email"
        id="email"
        type="email"
        label="e-mail"
        required
      />
      <Button color='light-green' fullWidth>Registrar-se</Button>
    </form>
  )
}
