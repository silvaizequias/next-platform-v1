import { AuthSignInSchema, AuthSignInSchemaType } from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
export default function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AuthSignInSchemaType>({
    mode: 'all',
    resolver: zodResolver(AuthSignInSchema),
  })

  return (
    <form className="flex flex-col flex-1 gap-4">
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
        {...register('password')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            variant="underlined"
            size="sm"
            name="password"
            type="password"
            label="Senha"
            errorMessage={errors.password?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Button
        size="sm"
        variant="shadow"
        color="primary"
        className="w-full uppercase"
      >
        Autenticar-se
      </Button>
    </form>
  )
}
