'use client'

import { useFormState } from 'react-dom'
import { actionCreateArticle } from '../actions'

export default function CreateArticle() {
  const [state, formAction] = useFormState(actionCreateArticle, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
