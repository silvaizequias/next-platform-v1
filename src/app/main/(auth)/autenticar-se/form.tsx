'use client'

import { Button, Input } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { SignInDTOType, SignInDTO } from './dto'

export default function SignInForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDTOType>({
    resolver: zodResolver(SignInDTO),
  })

  const onSubmit: SubmitHandler<SignInDTOType> = async (inputs) => {
    return await signIn('credentials', {
      redirect: false,
      phone: inputs?.phone,
      password: inputs?.password,
    }).then((res: any) => {
      if (!res.ok) {
        toast.error(res.error)
      } else {
        toast.success('boas vindas a dedicado')
        router.refresh()
      }
    })
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic">
        informe suas credenciais para autenticar-se na plataforma
      </p>
      <Input
        color="light-blue"
        label="celular"
        type="number"
        id="signInPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && errors?.phone && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="light-blue"
        label="senha"
        type="password"
        id="signInPassword"
        placeholder="s*e*n*h*a"
        crossOrigin={undefined}
        {...register('password')}
      />
      {errors && errors?.password && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.password?.message}
        </span>
      )}

      <Button color="light-blue" type="submit">
        autenticar-se
      </Button>
    </form>
  )
}
