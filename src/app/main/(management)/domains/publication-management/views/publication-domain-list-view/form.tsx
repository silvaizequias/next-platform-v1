'use client'

import { useFormState } from 'react-dom'
import { actionCreatePublicationDomain } from './actions'

const initialState = {}

export default function CreatePublicationDomainForm() {
  const [state, formAction] = useFormState(
    actionCreatePublicationDomain,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <button
        className="bg-green-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        adicionar domínio
      </button>
    </form>
  )
}
