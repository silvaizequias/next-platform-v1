'use client'

import { actionCreateSubscription } from '@/app/core/actions/subscriptions.action'
import { useFormState } from 'react-dom'

export default function CreateSubscription() {
  const [state, formAction] = useFormState(actionCreateSubscription, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
