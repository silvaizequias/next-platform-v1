'use client'

import { useFormState } from 'react-dom'
import { actionRemoveOrganization } from '../actions'

export default function RemoveOrganization() {
  const [state, formAction] = useFormState(actionRemoveOrganization, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
