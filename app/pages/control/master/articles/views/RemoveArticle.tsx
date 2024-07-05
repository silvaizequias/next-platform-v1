'use client'

import { useFormState } from "react-dom"
import { actionRemoveArticle } from "../actions"

export default function RemoveArticle() {
  const [state, formAction] = useFormState(actionRemoveArticle, {
    errors: undefined,
    success: false,
  })

  return <form noValidate action={formAction}></form>
}
