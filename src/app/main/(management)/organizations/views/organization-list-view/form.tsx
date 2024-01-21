'use client'

import { useFormState } from 'react-dom'
import { actionCreateOrganization } from './actions'
import { Button, Input } from '@material-tailwind/react'

const initialState = {}

export default function CreateOrganizationForm() {
  const [state, formAction] = useFormState(
    actionCreateOrganization,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <Input
        color="green"
        label="nome"
        type="text"
        name="name"
        id="createOrganizationName"
        placeholder="nome da organização"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="documento"
        type="text"
        name="document"
        id="createOrganizationDocument"
        placeholder="documento"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="telefone"
        type="number"
        name="phone"
        id="createOrganizationPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
      />
      <Input
        color="green"
        label="e-mail"
        type="email"
        name="email"
        id="createOrganizationEmail"
        placeholder="organização@email.com"
        crossOrigin={undefined}
      />

      <Button color="green" type="submit">
        criar organização
      </Button>
    </form>
  )
}
