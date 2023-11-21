'use client'

import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
export default function SignUpForm() {
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

  return (
    <form className="flex flex-col flex-1 gap-4 m-2">
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
      >
        Registrar-se
      </Button>
    </form>
  )
}
