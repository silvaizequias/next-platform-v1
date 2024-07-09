'use client'

import { useFormState } from 'react-dom'
import { actionUpdateSubscription } from '@/app/core/actions/subscriptions.action'

export default function UpdateUser() {
  const [state, formAction] = useFormState(actionUpdateSubscription, {
    errors: undefined,
    success: false,
  })
  return <form noValidate action={formAction}></form>
}
