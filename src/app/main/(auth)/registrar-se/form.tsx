'use client'

import { useFormState } from 'react-dom'
import { actionSignUp } from './actions'

const initialState = {}

export default function SignUpForm() {
  const [state, formAction] = useFormState(actionSignUp, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic">
        preencha os campos do formulário para registrar-se na plataforma
      </p>
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="text"
        name="name"
        id="signUpName"
        placeholder="seu nome completo"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="signUpPhone"
        placeholder="48 98765 4321"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="email"
        name="email"
        id="signUpEmail"
        placeholder="seu@email.com"
        required
      />
      <button
        className="bg-green-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        registrar-se
      </button>
    </form>
  )
}
