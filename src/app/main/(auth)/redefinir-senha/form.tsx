'use client'

import { useFormState } from 'react-dom'
import { actionResetPassword } from './actions'
import { Button, Input } from '@material-tailwind/react'

const initialState = {}

export default function ResetPasswordForm() {
  const [state, formAction] = useFormState(actionResetPassword, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic">
        um código de segurança será enviado para o número de telefone registrado
        na plataforma
      </p>
      <Input
        color="orange"
        label="celular"
        type="number"
        name="phone"
        id="resetPasswordPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
      />

      <Button color="orange" type="submit">
        redefinir a senha
      </Button>
    </form>
  )
}
