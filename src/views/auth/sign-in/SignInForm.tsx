'use client'

import { AuthSignInDTO, AuthSignInDTOType } from '@/dto/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthSignInDTOType>({
    mode: 'all',
    resolver: zodResolver(AuthSignInDTO),
  })

  const onSubmit: SubmitHandler<AuthSignInDTOType> = async (inputs) => {
    try {
      await signIn('credentials', {
        redirect: false,
        email: inputs?.email,
        password: inputs?.password,
      }).then(async (res: any) => {
        if (res.ok) {
          toast.success(`boas vindas`)
          router.refresh()
        } else {
          toast.error(`ocorreu um erro inesperado (ERRO ${res.status})`)
        }
      })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
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
        {...register('password')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            color="blue"
            name="password"
            type="password"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <button type="submit">Autenticar-se</button>
    </form>
  )
}
