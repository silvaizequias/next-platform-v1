'use client'

import { actionSignUp } from './actions'
import { Button, Input } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpDTOType, SignUpDTO } from './dto'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
  const randomCode = Math.random().toString(32).substr(2, 16)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDTOType>({
    resolver: zodResolver(SignUpDTO),
  })

  const onSubmit: SubmitHandler<SignUpDTOType> = async (inputs) => {
    console.log(inputs)
    const result = await actionSignUp({ ...inputs, password: randomCode })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
      await signIn('credentials', {
        redirect: false,
        phone: inputs?.phone,
        password: randomCode,
      }).then((res: any) => {
        if (!res.ok) {
          toast.error(res?.error)
        } else {
          toast.success(`boas vindas a dedicado ${inputs?.name}`)
          router.refresh()
        }
      })
    }
  }

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="py-4 text-center italic">
        preencha os campos do formulário para registrar-se na plataforma
      </p>
      <Input
        color="green"
        label="nome completo"
        type="text"
        id="signUpName"
        placeholder="seu nome completo"
        crossOrigin={undefined}
        {...register('name')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.name?.message}
        </span>
      )}

      <Input
        color="green"
        label="celular"
        type="number"
        id="signUpPhone"
        placeholder="48 98765 4321"
        crossOrigin={undefined}
        {...register('phone')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.phone?.message}
        </span>
      )}

      <Input
        color="green"
        label="e-mail"
        type="email"
        id="signUpEmail"
        placeholder="seu@email.com"
        crossOrigin={undefined}
        {...register('email')}
      />
      {errors && (
        <span className="text-xs text-red-400 italic font-thin">
          {errors?.email?.message}
        </span>
      )}

      <Button color="green" type="submit">
        registrar-se
      </Button>
    </form>
  )
}
