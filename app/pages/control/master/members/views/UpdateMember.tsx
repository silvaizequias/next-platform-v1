'use client'

import { useFormState } from 'react-dom'
import { actionUpdateMember } from '@/app/core/actions/members.action'

export default function UpdateMember() {
  const [state, formAction] = useFormState(actionUpdateMember, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
