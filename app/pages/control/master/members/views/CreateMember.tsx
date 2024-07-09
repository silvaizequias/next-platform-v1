'use client'

import { actionCreateMember } from '@/app/core/actions/members.action'
import { useFormState } from 'react-dom'

export default function CreateMember() {
  const [state, formAction] = useFormState(actionCreateMember, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
