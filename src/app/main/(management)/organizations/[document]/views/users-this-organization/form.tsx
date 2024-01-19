'use client'

import { useFormState } from 'react-dom'
import actionCreateOrganizationUser from './actions'
import useFetch from '@/hooks/use-fetch'
import { UserType } from '@/app/main/(management)/users/types'
import { Fragment, useState } from 'react'
import { Listbox } from '@headlessui/react'

const initialState = {}

export default function CreateOrganizationUserForm() {
  const { data: users } = useFetch<UserType[] | any>('/api/users')
  const [state, formAction] = useFormState(
    actionCreateOrganizationUser,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-2 text-center italic"></p>
      <select
        className="rounded shadow border-green-400 focus:shadow-lg"
        name="userRole"
        id="createOrganizationUserRole"
      >
        <option value="client">client</option>
        <option value="assistant">assistant</option>
        <option value="technician">technician</option>
        <option value="administrator">administrator</option>
      </select>

      <input
        className="rounded shadow border-green-400 focus:shadow-lg"
        type="number"
        name="userPhone"
        id="createOrganizationUserPhone"
        placeholder="48 98765 4321"
        required
      />
      <span className="text-xs font-thin italic">{}</span>

      <button
        className="bg-green-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        adicionar usuário
      </button>
    </form>
  )
}
