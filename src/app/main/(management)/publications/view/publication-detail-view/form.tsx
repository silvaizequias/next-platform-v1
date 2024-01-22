'use client'

import { PublicationType } from '../../types'
import { actionUpdatePublication } from './actions'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdatePublicationDTO,
  UpdatePublicationDTOType,
} from '@/app/api/publication-management/publications/dto'

interface Props {
  publication: PublicationType
}

export default function UpdatePublicationForm(props: Props) {
  const { publication } = props
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePublicationDTOType>({
    resolver: zodResolver(UpdatePublicationDTO),
  })

  const onSubmit: SubmitHandler<UpdatePublicationDTOType> = async (inputs) => {
    const response = await actionUpdatePublication(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Button color="light-blue" type="submit">
        atualizar publicação
      </Button>
    </form>
  )
}
