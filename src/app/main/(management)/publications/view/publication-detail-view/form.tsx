'use client'

import { useFormState } from 'react-dom'
import { PublicationType } from '../../types'
import { actionUpdatePublication } from './actions'
import { Button } from '@material-tailwind/react'

interface Props {
  publication: PublicationType
}

const initialState = {}

export default function UpdatePublicationForm(props: Props) {
  const { publication } = props
  const [state, formAction] = useFormState(
    actionUpdatePublication,
    initialState,
  )

  return (
    <form className="flex flex-col w-full max-w-lg gap-4" action={formAction}>
      <p className="py-4 text-center italic"></p>
      <Button color="light-blue" type="submit">
        atualizar publicação
      </Button>
    </form>
  )
}
