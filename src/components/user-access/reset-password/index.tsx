'use client'

import { Button, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { actionSubmitResetPassword } from './actions'

export default function ResetPasswordForm() {
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await actionSubmitResetPassword(formData)
  }

  return (
    <form className="flex flex-col justify-center items-center gap-2">
      <Typography variant="small" className="text-center lowercase -p2">
        informe o número de celular registrado na plataforma e receber o código
        de segurança para redefinir sua senha de acesso
      </Typography>
      <Input
        crossOrigin={undefined}
        name="phone"
        id="resetPasswordPhone"
        type="number"
        label="celular"
        required
      />
      <Button color="orange" fullWidth>
        Redefinir a Senha
      </Button>
    </form>
  )
}
