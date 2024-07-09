'use client'

import { actionCreateOrganization } from '@/app/core/actions/organizations.action'
import { useFormState } from 'react-dom'

export default function CreateOrganization() {
  const [state, formAction] = useFormState(actionCreateOrganization, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
