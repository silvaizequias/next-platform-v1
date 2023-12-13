import {
  SignInDTO,
  SignInDTOType,
} from '@/app/api/platform-management/signin/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
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
        variant="flat"
        color="warning"
        className="w-full uppercase"
        type="submit"
      >
        Acessar
      </Button>
    </form>
  )
}
