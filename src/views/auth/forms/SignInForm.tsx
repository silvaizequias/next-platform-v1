import { SignInSchema, SignInSchemaType } from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export default function SignInForm() {
  const router = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit: SubmitHandler<SignInSchemaType> = async (inputs, e) => {
    e?.preventDefault()

    const { phone, password } = inputs
    try {
      await signIn('credentials', {
        phone: phone,
        password: password,
      })
        .then(async (res: any) => {
          if (res.url && !res.error) {
            router.refresh()
          } else {
            console.error(res.error)
          }
        })
        .catch((error: any) => {
          console.error(error)
        })
    } catch (error: any) {
      console.error(error)
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
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='11 9876 54321'
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
              type='password'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='********'
            />
          )}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <button type='submit'>Acessar</button>
      </div>
    </form>
  )
}
