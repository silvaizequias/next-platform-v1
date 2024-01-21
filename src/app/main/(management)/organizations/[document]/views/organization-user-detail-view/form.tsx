'use client'

import { useFormState } from 'react-dom'
import { OrganizationUsersType } from '../../../types'
import actionUpdateOrganizationUser from './actions'

interface Props {
  organizationUser: OrganizationUsersType
}

const initialState = {}

export default function UpdateOrganizationUserForm(props: Props) {
  const { organizationUser } = props
  const [state, formAction] = useFormState(
    actionUpdateOrganizationUser,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-2 text-center italic"></p>
      <select
        className="rounded shadow border-blue-400 focus:shadow-lg"
        name="userRole"
        id="updateOrganizationUserRole"
        defaultValue={organizationUser?.role}
      >
        <option value="client">client</option>
        <option value="assistant">assistant</option>
        <option value="technician">technician</option>
        <option value="administrator">administrator</option>
        <option value="owner">owner</option>
      </select>

      <select
        className="rounded shadow border-blue-400 focus:shadow-lg"
        name="active"
        id="updateOrganizationUserActive"
      >
        <option value="true">ativo</option>
        <option value="false">inativo</option>
      </select>

      <span className="text-xs font-thin italic">{}</span>

      <button
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        atualizar usuário
      </button>
    </form>
  )
}
