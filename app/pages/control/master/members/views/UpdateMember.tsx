'use client'

import { useFormState } from 'react-dom'
import { actionUpdateMember } from '../actions'

export default function UpdateMember() {
  const [state, formAction] = useFormState(actionUpdateMember, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
