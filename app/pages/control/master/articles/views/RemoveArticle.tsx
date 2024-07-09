'use client'

import { useFormState } from 'react-dom'
import { actionRemoveArticle } from '@/app/core/actions/articles.action'

export default function RemoveArticle() {
  const [state, formAction] = useFormState(actionRemoveArticle, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
