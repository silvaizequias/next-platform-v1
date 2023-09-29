import {
  AuthResetPasswordSchema,
  AuthResetPasswordSchemaType,
} from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AuthResetPasswordForm() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AuthResetPasswordSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthResetPasswordSchema),
  })

  const onSubmit: SubmitHandler<AuthResetPasswordSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .post(`api/reset-password`, inputs)
        .then((res: any) => {
          if (res.data) {
            toast.success(res.data)
            router.refresh()
          } else {
            toast.error('Ocorreu um erro inesperado!')
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
          {...register('email')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              type='email'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='seu@email.com'
            />
          )}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <button type='submit'>Redefinir a Senha</button>
    </form>
  )
}
