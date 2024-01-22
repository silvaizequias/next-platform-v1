'use client'

import { useFormState } from 'react-dom'
import { actionUpdateOrganization } from './actions'
import { OrganizationType } from '../../types'
import { Button, Input } from '@material-tailwind/react'

interface Props {
  organization: OrganizationType
}

const initialState = {}

export default function UpdateOrganizationForm(props: Props) {
  const { organization } = props
  const [state, formAction] = useFormState(
    actionUpdateOrganization,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <Input
        color="light-blue"
        label="nome"
        type="text"
        name="name"
        id="updateOrganizationName"
        placeholder="nome da organização"
        defaultValue={organization?.name}
        crossOrigin={undefined}
      />
      <Input
        color="light-blue"
        label="documento"
        type="text"
        name="document"
        id="updateOrganizationDocument"
        placeholder="documento"
        defaultValue={organization?.documentCode}
        crossOrigin={undefined}
      />
      <Input
        color="light-blue"
        label="telefone"
        type="number"
        name="phone"
        id="updateOrganizationPhone"
        placeholder="48 98765 4321"
        defaultValue={organization?.phone}
        crossOrigin={undefined}
      />
      <Input
        color="light-blue"
        label="e-mail"
        type="email"
        name="email"
        id="updateOrganizationEmail"
        placeholder="organizacao@email.com"
        defaultValue={organization?.email}
        crossOrigin={undefined}
      />

      <Button color="light-blue" type="submit">
        atualizar organização
      </Button>
    </form>
  )
}
