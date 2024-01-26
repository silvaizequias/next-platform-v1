'use client'

import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateProfilePasswordDTO, UpdateProfilePasswordDTOType } from '../dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'

export default function ProfilePasswordUpdateFormView() {
  const { data: session } = useSession()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateProfilePasswordDTOType>({
    resolver: zodResolver(UpdateProfilePasswordDTO),
  })
  const onSubmit: SubmitHandler<UpdateProfilePasswordDTOType> = async (
    inputs,
  ) => {
    console.log(inputs)
  }
  return (
    <form
      className="w-full flex flex-col gap-4 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        color="orange"
        label="senha atual"
        type="password"
        crossOrigin={undefined}
        {...register('oldPassword')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.oldPassword?.message}
        </span>
      )}

      <Input
        color="orange"
        label="nova senha"
        type="password"
        crossOrigin={undefined}
        {...register('newPassword')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.newPassword?.message}
        </span>
      )}

      <Input
        color="orange"
        label="confirmar nova senha"
        type="password"
        crossOrigin={undefined}
        {...register('confirmNewPassword')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.confirmNewPassword?.message}
        </span>
      )}

      <Button color="orange" type="submit">
        atualizar senha
      </Button>
    </form>
  )
}
