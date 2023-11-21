import { AuthSignInSchema, AuthSignInSchemaType } from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
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
  } = useForm<AuthSignInSchemaType>({
    mode: 'all',
    resolver: zodResolver(AuthSignInSchema),
  })

  const onSubmit: SubmitHandler<AuthSignInSchemaType> = async (inputs) => {
    const { email, password } = inputs
    try {
      await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      }).then(async (res: any) => {
        console.log(res)
        if (!res.error) {
          reset(inputs)
          toast.success('muito bem vindo(a)')
          router.refresh()
        } else {
          toast.error(res.error)
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
      className="flex flex-col flex-1 gap-4"
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
        type="submit"
      >
        Autenticar-se
      </Button>
    </form>
  )
}
