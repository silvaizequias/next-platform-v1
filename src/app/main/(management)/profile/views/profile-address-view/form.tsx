'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionUpdateProfileAddress } from './actions'
import { UpdateProfileAddressDTO, UpdateProfileAddressDTOType } from '../../dto'

export default function ProfileAddressForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileAddressDTOType>({
    resolver: zodResolver(UpdateProfileAddressDTO),
  })

  const onSubmit: SubmitHandler<UpdateProfileAddressDTOType> = async (
    inputs,
  ) => {
    const response = await actionUpdateProfileAddress(inputs)
    console.log(response)
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-2 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic"></p>
      <Button color="light-blue" type="submit">
        atualizar endereço
      </Button>
    </form>
  )
}
