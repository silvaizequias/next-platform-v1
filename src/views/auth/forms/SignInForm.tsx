import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthSignInSchemaType>({
    mode: 'all',
    resolver: yupResolver(AuthSignInSchema),
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
        .then((res) => {
          if (!res?.error && res?.url) {
            router.refresh()
          } else {
            null
          }
        })
        .catch((error: any) => {})
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('phone')} />
        <input {...register('password')} />
      </div>
      <button type='submit'>SignIn</button>
    </form>
  )
}
