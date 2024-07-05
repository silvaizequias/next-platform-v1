'use client'

import { useFormState } from 'react-dom'
import { actionUpdateUser } from '../actions'

export default function UpdateUser() {
  const [state, formAction] = useFormState(actionUpdateUser, {
    errors: undefined,
    success: false,
  })
  return <form noValidate action={formAction}></form>
}
