'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionUpdateProfilePassword } from './actions'
import {
  UpdateProfilePasswordDTO,
  UpdateProfilePasswordDTOType,
} from '../../dto'

export default function ProfilePasswordForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfilePasswordDTOType>({
    resolver: zodResolver(UpdateProfilePasswordDTO),
  })

  const onSubmit: SubmitHandler<UpdateProfilePasswordDTOType> = async (
    inputs,
  ) => {
    const response = await actionUpdateProfilePassword(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-2 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Button color="orange" type="submit">
        atualizar senha
      </Button>
    </form>
  )
}
