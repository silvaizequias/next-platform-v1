'use client'

import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
export default function SignUpForm() {
  const router = useRouter()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthSignUpSchemaType>({
    mode: 'all',
    resolver: zodResolver(AuthSignUpSchema),
  })

  const onSubmit: SubmitHandler<AuthSignUpSchemaType> = async (inputs) => {
    const data: AuthSignUpSchemaType = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      password: randomCode,
    }

    try {
      await fetch('/api/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res.status == 201) {
          reset({ name: '', email: '', phone: '' })

          await signIn('credentials', {
            redirect: false,
            email: inputs.email,
            password: randomCode,
          }).then(async (res: any) => {
            if (!res.error && res.url) {
              toast.success(`Olá ${inputs.name}`)
              router.refresh()
            } else {
              toast.error(res.error)
            }
          })
        } else {
          const data = res.json()
          toast.error(data)
        }
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <Controller
        {...register('name')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="name"
            type="text"
            label="Nome Completo"
            errorMessage={errors.name?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="email"
            type="email"
            label="E-mail"
            errorMessage={errors.email?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('phone')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="phone"
            type="number"
            label="Celular"
            errorMessage={errors.phone?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button
        size="sm"
        variant="flat"
        color="success"
        className="w-full uppercase"
        type="submit"
      >
        Registrar-se
      </Button>
    </form>
  )
}
