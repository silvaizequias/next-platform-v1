'use client'

import {
  SignInDTO,
  SignInDTOType,
} from '@/app/api/platform-management/signin/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
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
        if (!res.error) {
          toast.success('boas vindas ao portal dedicado')
          router.refresh()
        } else {
          toast.error(res.error)
        }
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
      className="flex flex-col flex-1 gap-2 m-2"
    >
      <Controller
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="email"
            type="email"
            value={value}
            onChange={onChange}
            placeholder="seu@email.com"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.email?.message}
        </span>
      )}

      <Controller
        {...register('password')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="password"
            type="password"
            value={value}
            onChange={onChange}
            placeholder="*s*u*a-s*e*n*h*a"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.password?.message}
        </span>
      )}

      <p
        className="font-thint text-xs text-right italic cursor-pointer hover:opacity-50 lowercase"
        onClick={() => router.push('/auth/redefinir-senha')}
      >
        esqueceu a senha?
      </p>

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Acessar
      </Button>
    </form>
  )
}
