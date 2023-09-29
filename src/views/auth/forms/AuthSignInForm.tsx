import { AuthSignInSchema, AuthSignInSchemaType } from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AuthSignInForm() {
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AuthSignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthSignInSchema),
  })

  const onSubmit: SubmitHandler<AuthSignInSchemaType> = async (inputs, e) => {
    e?.preventDefault()

    const { phone, password } = inputs
    try {
      await signIn('credentials', {
        redirect: false,
        phone: phone,
        password: password,
      })
        .then(async (res: any) => {
          if (res.url && !res.error) {
            toast.success('Boas vindas!')
            router.refresh()
          } else {
            toast.error('O telefone ou a senha estão incorretos')
          }
        })
        .catch((error: any) => {
          console.error(error)
          toast.error(error?.message)
        })
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          {...register('phone')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='11 98765 4321'
            />
          )}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>
      <div>
        <Controller
          {...register('password')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              type={'password'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='********'
            />
          )}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type='submit'>Acessar</button>
    </form>
  )
}
