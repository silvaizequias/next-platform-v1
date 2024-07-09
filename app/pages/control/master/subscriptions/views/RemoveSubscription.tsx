'use client'

import { useFormState } from 'react-dom'
import { actionRemoveSubscription } from '@/app/core/actions/subscriptions.action'

export default function RemoveSubscription() {
  const [state, formAction] = useFormState(actionRemoveSubscription, {
    errors: undefined,
    success: false,
  })
  return <form noValidate action={formAction}></form>
}
