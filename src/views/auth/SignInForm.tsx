'use client'

import {
  SignInDTO,
  SignInDTOType,
} from '@/app/api/platform-management/signin/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SignInForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<SignInDTOType>({ mode: 'all', resolver: zodResolver(SignInDTO) })

  const onSubmit: SubmitHandler<SignInDTOType> = async (inputs) => {
    const { email, password } = inputs
    try {
      await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      }).then(async (res: any) => {
        if (res.error) alert(res.error)
        toast.success('boas vindas!')
        router.refresh()
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    } finally {
      reset(inputs)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <Controller
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input name="email" type="email" value={value} onChange={onChange} />
        )}
      />

      <Controller
        {...register('password')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="password"
            type="password"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <p
        className="font-thint text-xs text-right italic cursor-pointer hover:opacity-50"
        onClick={() => router.push('/auth/redefinir-senha')}
      >
        esqueceu a senha?
      </p>

      <button className="w-full uppercase" type="submit">
        Acessar
      </button>
    </form>
  )
}
