'use client'

import { Button, Input } from '@material-tailwind/react'
import { useFormState } from 'react-dom'
import { actionSetCreatePost } from '../actions'
import { useRouter } from 'next/navigation'

const initialState = {}

export default function EditorPostCreateScreen() {
  const router = useRouter()
  const [state, formAction] = useFormState(actionSetCreatePost, initialState)

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center gap-2"
    >
      <Input
        crossOrigin={undefined}
        name="title"
        id="createPostTitle"
        type="text"
        label="título"
        required
      />
      <Input
        crossOrigin={undefined}
        name="subject"
        id="createPostSubject"
        type="text"
        label="assunto"
        required
      />
      <Button type="submit" color="light-green" fullWidth>
        criar postagem
      </Button>
    </form>
  )
}
