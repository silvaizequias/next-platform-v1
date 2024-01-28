'use client'

import { actionResetPassword } from '../actions'
import { Button, Input } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { ResetPasswordDTOType, ResetPasswordDTO } from '../dto'

export default function ResetPasswordFormView({
  close,
}: {
  close: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDTOType>({
    resolver: zodResolver(ResetPasswordDTO),
  })

  const onSubmit: SubmitHandler<ResetPasswordDTOType> = async (inputs) => {
    const result = await actionResetPassword(inputs)
    if (result?.response?.error) {
      close()
      toast.error(result.message)
    } else {
      close()
      toast.success(result)
    }
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic">
        um código de segurança será enviado para o número de telefone registrado
        na plataforma
      </p>
      <Input
        color="orange"
        label="celular"
        type="number"
        id="resetPasswordPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Button color="orange" type="submit">
        redefinir a senha
      </Button>
    </form>
  )
}
