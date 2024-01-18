'use client'

import { useFormState } from 'react-dom'
import { PublicationType } from '../../types'
import { actionUpdatePublication } from './actions'

interface Props {
  publication: PublicationType
}

const initialState = {}

export default function UpdatePublicationForm(props: Props) {
  const { publication } = props
  const [state, formAction] = useFormState(
    actionUpdatePublication,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <button
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        atualizar publicação
      </button>
    </form>
  )
}
