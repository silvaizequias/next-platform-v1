'use client'

import { useRouter } from 'next/navigation'
import { DomainType } from '../../../types'
import { actionUpdatePublicationDomain } from './actions'
import { Button } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateDomainDTO,
  UpdateDomainDTOType,
} from '@/app/api/publication-management/domains/dto'

interface Props {
  domain: DomainType
}

export default function UpdatePublicationDomainForm(props: Props) {
  const { domain } = props

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDomainDTOType>({
    resolver: zodResolver(UpdateDomainDTO),
  })

  const onSubmit: SubmitHandler<UpdateDomainDTOType> = async (inputs) => {
    const response = await actionUpdatePublicationDomain(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Button color="light-blue" type="submit">
        atualizar domínio
      </Button>
    </form>
  )
}
