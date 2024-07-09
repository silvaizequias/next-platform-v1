'use client'

import { useFormState } from 'react-dom'
import { actionUpdateArticle } from '@/app/core/actions/articles.action'

export default function UpdateArticle() {
  const [state, formAction] = useFormState(actionUpdateArticle, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
