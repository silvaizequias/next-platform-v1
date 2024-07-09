'use client'

import { actionCreateUser } from '@/app/core/actions/users.action'
import { useFormState } from 'react-dom'

export default function CreateUser() {
  const [state, formAction] = useFormState(actionCreateUser, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
