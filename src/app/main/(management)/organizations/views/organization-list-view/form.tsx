'use client'

import { useFormState } from 'react-dom'
import { actionCreateOrganization } from './actions'

const initialState = {}

export default function CreateOrganizationForm() {
  const [state, formAction] = useFormState(
    actionCreateOrganization,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="text"
        name="name"
        id="createOrganizationName"
        placeholder="nome da organização"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="text"
        name="name"
        id="createOrganizationDocument"
        placeholder="documento"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="createOrganizationPhone"
        placeholder="48 98765 4321"
        required
      />
      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="email"
        name="email"
        id="createOrganizationEmail"
        placeholder="organização@email.com"
        required
      />
      <button
        className="bg-green-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        criar organização
      </button>
    </form>
  )
}
