'use client'

import { Button, Input } from '@material-tailwind/react'
import { UserType } from '../../users/types'
import { useFormState } from 'react-dom'
import { actionSetUpdateProfile } from '../actions'
import { useRouter } from 'next/navigation'

const initialState = {}

interface Props {
  profile: UserType
}

export default function ProfileUpdateFormView(props: Props) {
  const { profile } = props
  const router = useRouter()
  const [state, formAction] = useFormState(actionSetUpdateProfile, initialState)

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center gap-2"
    >
      <Input
        crossOrigin={undefined}
        name="name"
        id="updateProfileName"
        type="text"
        label="nome completo"
        required
      />
      <Input
        crossOrigin={undefined}
        name="phone"
        id="updateProfilePhone"
        type="number"
        label="celular"
        required
      />
      <Input
        crossOrigin={undefined}
        name="email"
        id="updateProfileEmail"
        type="email"
        label="e-mail"
        required
      />
      <Button type="submit" color="light-blue" fullWidth>
        atualizar informações
      </Button>
    </form>
  )
}
