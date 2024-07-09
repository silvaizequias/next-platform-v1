'use client'

import { actionCreateArticle } from '@/app/core/actions/articles.action'
import { useFormState } from 'react-dom'

export default function CreateArticle() {
  const [state, formAction] = useFormState(actionCreateArticle, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
