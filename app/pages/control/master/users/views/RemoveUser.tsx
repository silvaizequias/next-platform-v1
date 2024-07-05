'use client'

import { useFormState } from 'react-dom'
import { actionRemoveUser } from '../actions'

export default function RemoveUser() {
  const [state, formAction] = useFormState(actionRemoveUser, {
    errors: undefined,
    success: false,
  })
  return <form noValidate action={formAction}></form>
}
