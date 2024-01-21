'use client'

import { useFormState } from 'react-dom'
import { actionCreatePublicationDomain } from './actions'
import { Button } from '@material-tailwind/react'

const initialState = {}

export default function CreatePublicationDomainForm() {
  const [state, formAction] = useFormState(
    actionCreatePublicationDomain,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <Button color="green" type="submit">
        adicionar domínio
      </Button>
    </form>
  )
}
