'use client'

import { useFormState } from 'react-dom'
import { actionCreateOrganization } from '../actions'

export default function CreateOrganization() {
  const [state, formAction] = useFormState(actionCreateOrganization, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
