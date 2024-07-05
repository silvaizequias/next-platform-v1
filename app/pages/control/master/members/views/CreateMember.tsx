'use client'

import { useFormState } from 'react-dom'
import { actionCreateMember } from '../actions'

export default function CreateMember() {
  const [state, formAction] = useFormState(actionCreateMember, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
