'use client'

import { actionCreatePublication } from './actions'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreatePublicationDTO,
  CreatePublicationDTOType,
} from '@/app/api/publication-management/publications/dto'

export default function CreatePublicationForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePublicationDTOType>({
    resolver: zodResolver(CreatePublicationDTO),
  })

  const onSubmit: SubmitHandler<CreatePublicationDTOType> = async (inputs) => {
    const response = await actionCreatePublication(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Button color="green" type="submit">
        criar publicação
      </Button>
    </form>
  )
}
