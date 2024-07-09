'use client'

import { useFormState } from 'react-dom'
import { actionRemoveMember } from '@/app/core/actions/members.action'

export default function RemoveMember() {
  const [state, formAction] = useFormState(actionRemoveMember, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
