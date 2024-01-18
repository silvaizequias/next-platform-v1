'use client'

import { useFormState } from 'react-dom'
import { actionUpdateOrganization } from './actions'
import { OrganizationType } from '../../types'

interface Props {
  organization: OrganizationType
}

const initialState = {}

export default function UpdateOrganizationForm(props: Props) {
  const { organization } = props
  const [state, formAction] = useFormState(
    actionUpdateOrganization,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="text"
        name="name"
        id="updateOrganizationName"
        placeholder="nome da organização"
        defaultValue={organization?.name}
      />
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="text"
        name="name"
        id="updateOrganizationDocument"
        placeholder="documento"
        defaultValue={organization?.documentCode}
      />
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="updateOrganizationPhone"
        placeholder="48 98765 4321"
        defaultValue={organization?.phone}
      />
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="email"
        name="email"
        id="updateOrganizationEmail"
        placeholder="organizacao@email.com"
        defaultValue={organization?.email}
      />
      <button
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        atualizar organização
      </button>
    </form>
  )
}
