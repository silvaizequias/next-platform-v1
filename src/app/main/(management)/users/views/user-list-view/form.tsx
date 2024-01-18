'use client'

import { useFormState } from 'react-dom'
import { actionCreateUser } from './actions'

const initialState = {}

export default function CreateUserForm() {
  const [state, formAction] = useFormState(actionCreateUser, initialState)

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <select
        className="rounded shadow border-green-400 focus:shadow-lg"
        name="profile"
        id="createUserProfile"
      >
        <option value="guest">guest</option>
        <option value="consumer">consumer</option>
        <option value="member">member</option>
        <option value="master">master</option>
      </select>
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="text"
        name="name"
        id="createUserName"
        placeholder="nome completo"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="createUserPhone"
        placeholder="48 98765 4321"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="email"
        name="email"
        id="createUserEmail"
        placeholder="nome@email.com"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="password"
        name="password"
        id="createUserPassword"
        placeholder="s*e*n*h*a"
      />
      <button
        className="bg-green-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        criar usuário
      </button>
    </form>
  )
}
