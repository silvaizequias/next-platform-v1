'use client'

import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { actionSetUpdateProfilePassword } from '../actions'
import { Button, Input } from '@material-tailwind/react'

const initialState = {}

interface Props {
  id: string
}

export default function ProfilePasswordUpdateFormView(props: Props) {
  const { id } = props
  const router = useRouter()
  const [state, formAction] = useFormState(
    actionSetUpdateProfilePassword,
    initialState,
  )

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center gap-2"
    >
      <Input
        crossOrigin={undefined}
        name="oldPassword"
        id="oldPassword"
        type="password"
        label="senha atual"
        required
      />
      <Input
        crossOrigin={undefined}
        name="newPassword"
        id="newPassword"
        type="password"
        label="nova senha"
        required
      />
      <Input
        crossOrigin={undefined}
        name="confirmNewPassword"
        id="confirmNewPassword"
        type="password"
        label="confirmar nova senha"
        required
      />
      <Button type="submit" color="orange" fullWidth>
        atualizar senha
      </Button>
    </form>
  )
}
