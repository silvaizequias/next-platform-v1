'use client'

import { useFormState } from 'react-dom'
import { actionCreateUser } from '../actions'

export default function CreateUser() {
  const [state, formAction] = useFormState(actionCreateUser, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
