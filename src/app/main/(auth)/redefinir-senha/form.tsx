'use client'

import { useFormState } from 'react-dom'
import { actionResetPassword } from './actions'

const initialState = {}

export default function ResetPasswordForm() {
  const [state, formAction] = useFormState(actionResetPassword, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic">
        um código de segurança será enviado para o número de telefone registrado
        na plataforma
      </p>
      <input
        className="rounded shadow border-orange-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="resetPasswordPhone"
        placeholder="48 98765 4321"
        required
      />
      <button
        className="bg-orange-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        redefinir a senha
      </button>
    </form>
  )
}
