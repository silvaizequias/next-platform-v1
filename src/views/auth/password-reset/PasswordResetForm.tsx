'use client'

import { AuthPasswordResetDTO, AuthPasswordResetDTOType } from '@/dto/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function PasswordResetForm() {
  const PLATFORM_MANAGEMENT_API_URL =
    process.env.NEXT_PUBLIC_PLATFORM_MANAGEMENT_API_URL!
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthPasswordResetDTOType>({
    mode: 'all',
    resolver: zodResolver(AuthPasswordResetDTO),
  })

  const onSubmit: SubmitHandler<AuthPasswordResetDTOType> = async (inputs) => {
    try {
      await fetch(`${PLATFORM_MANAGEMENT_API_URL}/auth/password-reset`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json().message)
        toast.success(await res?.json())
      })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
      console.error(error)
    } finally {
      reset
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            color="blue"
            name="email"
            type="email"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        {...register('phone')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            color="blue"
            name="phone"
            type="number"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <button type="submit">Redefinir a Senha</button>
    </form>
  )
}
