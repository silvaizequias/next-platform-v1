'use client'

import { useFormState } from 'react-dom'
import { DomainType } from '../../../types'
import { actionUpdatePublicationDomain } from './actions'
import { Button } from '@material-tailwind/react'

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
      <Button color="light-blue" type="submit">
        atualizar domínio
      </Button>
    </form>
  )
}
