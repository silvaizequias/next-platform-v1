'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionUpdateProfilePassword } from './actions'
import {
  UpdateProfilePasswordDTO,
  UpdateProfilePasswordDTOType,
} from '../../dto'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function ProfilePasswordForm(props: Props) {
  const { session } = props
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
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        color="orange"
        label="senha atual"
        crossOrigin={undefined}
        {...register('oldPassword')}
      />
      {errors && errors?.oldPassword && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.oldPassword?.message}
        </span>
      )}

      <Input
        color="orange"
        label="nova senha"
        crossOrigin={undefined}
        {...register('newPassword')}
      />
      {errors && errors?.newPassword && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.newPassword?.message}
        </span>
      )}
      <Input
        color="orange"
        label="confirmar nova senha"
        crossOrigin={undefined}
        {...register('confirmNewPassword')}
      />
      {errors && errors?.confirmNewPassword && (
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
