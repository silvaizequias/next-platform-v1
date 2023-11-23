'use client'

import {
  AuthPasswordResetSchema,
  AuthPasswordResetSchemaType,
} from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
export default function PasswordResetForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthPasswordResetSchemaType>({
    mode: 'all',
    resolver: zodResolver(AuthPasswordResetSchema),
  })

  const onSubmit: SubmitHandler<AuthPasswordResetSchemaType> = async (
    inputs,
  ) => {
    try {
      await fetch('/api/password-reset', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          reset(inputs)
          toast.success(data)
        } else {
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
        color="warning"
        className="w-full uppercase"
        type="submit"
      >
        Redefinir a Senha
      </Button>
    </form>
  )
}
