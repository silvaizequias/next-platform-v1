import {
  AuthForgotPasswordSchema,
  AuthForgotPasswordSchemaType,
} from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { error } from 'console'
import { Controller, useForm } from 'react-hook-form'
export default function ForgotPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthForgotPasswordSchemaType>({
    mode: 'all',
    resolver: zodResolver(AuthForgotPasswordSchema),
  })

  return (
    <form className="flex flex-col flex-1 gap-4 m-2">
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
            type="text"
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
      >
        Redefinir a Senha
      </Button>
    </form>
  )
}
