'use client'

import { useFormState } from 'react-dom'
import { DomainType } from '../../../types'
import { actionUpdatePublicationDomain } from './actions'

interface Props {
  domain: DomainType
}

const initialState = {}

export default function UpdatePublicationDomainForm(props: Props) {
  const { domain } = props
  const [state, formAction] = useFormState(
    actionUpdatePublicationDomain,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <button
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        atualizar domínio
      </button>
    </form>
  )
}
