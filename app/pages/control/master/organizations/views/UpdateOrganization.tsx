'use client'

import { useFormState } from 'react-dom'
import { actionUpdateOrganization } from '../actions'

export default function UpdateMyOrganization() {
  const [state, formAction] = useFormState(actionUpdateOrganization, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
