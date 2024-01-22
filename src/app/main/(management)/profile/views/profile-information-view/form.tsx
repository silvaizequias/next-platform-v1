'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  UpdateProfileInformationDTO,
  UpdateProfileInformationDTOType,
} from '../../dto'
import { actionUpdateProfileInformation } from './actions'

export default function ProfileInformationForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInformationDTOType>({
    resolver: zodResolver(UpdateProfileInformationDTO),
  })

  const onSubmit: SubmitHandler<UpdateProfileInformationDTOType> = async (
    inputs,
  ) => {
    const response = await actionUpdateProfileInformation(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-2 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Button color="light-blue" type="submit">
        atualizar informações
      </Button>
    </form>
  )
}
