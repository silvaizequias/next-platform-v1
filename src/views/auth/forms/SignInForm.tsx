import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthSignInSchemaType>({
    mode: 'onChange',
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
        .then((res: any) => {
          if (!res?.error && res?.url) {
            alert(JSON.stringify(`Boas Vindas!`))
            router.refresh()
          } else {
            alert(JSON.stringify('O Celular ou a Senha estão Incorretos!'))
          }
        })
        .catch((error: any) => {
          alert(JSON.stringify(error?.message || error))
          new Error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
      new Error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <>
        <Controller
          name='phone'
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
      </>
      <>
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              placeholder='**********'
            />
          )}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </>
      <button type='submit'>Autenticar-se</button>
    </form>
  )
}
