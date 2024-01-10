'use client'

import { Button, Input } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import { useFormState } from 'react-dom'
import { actionSetUpdatePost } from '../actions'
import { PostType } from '../../types'

const initialState = {}

interface Props {
  post: PostType
}

export default function UpdateEditorScreen(props: Props) {
  const { post } = props
  const router = useRouter()
  const [state, formAction] = useFormState(actionSetUpdatePost, initialState)

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
      <Button type="submit" color="light-blue" fullWidth>
        atualizar postagem
      </Button>
    </form>
  )
}
