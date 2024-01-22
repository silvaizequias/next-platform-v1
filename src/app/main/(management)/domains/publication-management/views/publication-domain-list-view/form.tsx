'use client'

import { useRouter } from 'next/navigation'
import { actionCreatePublicationDomain } from './actions'
import { Button } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateDomainDTO,
  CreateDomainDTOType,
} from '@/app/api/publication-management/domains/dto'

export default function CreatePublicationDomainForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDomainDTOType>({
    resolver: zodResolver(CreateDomainDTO),
  })

  const onSubmit: SubmitHandler<CreateDomainDTOType> = async (inputs) => {
    const response = await actionCreatePublicationDomain(inputs)
    console.log(response)
  }
  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Button color="green" type="submit">
        adicionar domínio
      </Button>
    </form>
  )
}
