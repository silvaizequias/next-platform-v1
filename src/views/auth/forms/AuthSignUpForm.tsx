import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AuthSignUpForm() {
  const router = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AuthSignUpSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthSignUpSchema),
  })

  const onSubmit: SubmitHandler<AuthSignUpSchemaType> = async (inputs, e) => {
    e?.preventDefault()

    try {
      await axios
        .post(`/api/sign-up`, inputs)
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
          {...register('name')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='Seu Nome Completo'
            />
          )}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
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
      <button type='submit'>Registrar-se</button>
    </form>
  )
}
