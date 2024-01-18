'use client'

import { useFormState } from 'react-dom'
import { UserType } from '../../types'
import { actionUpdateUser } from './actions'

interface Props {
  user: UserType
}

const initialState = {}

export default function UpdateUserForm(props: Props) {
  const { user } = props
  const [state, formAction] = useFormState(actionUpdateUser, initialState)

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      action={formAction}
    >
      <p className="py-4 text-center italic"></p>
      <select
        className="rounded shadow border-blue-400 focus:shadow-lg"
        name="profile"
        id="updateUserProfile"
        defaultValue={user?.profile}
      >
        <option value="guest">guest</option>
        <option value="consumer">consumer</option>
        <option value="member">member</option>
        <option value="master">master</option>
      </select>
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="text"
        name="name"
        id="updateUserName"
        placeholder="nome completo"
        defaultValue={user?.name}
      />
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="updateUserPhone"
        placeholder="48 98765 4321"
        defaultValue={user?.phone}
      />
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="email"
        name="email"
        id="updateUserEmail"
        placeholder="nome@email.com"
        defaultValue={user?.email}
      />
      <button
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        atualizar usuário
      </button>
    </form>
  )
}
