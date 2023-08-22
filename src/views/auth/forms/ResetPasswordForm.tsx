import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export default function ResetPasswordForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthResetPasswordType>({
    mode: 'onChange',
    resolver: yupResolver(AuthResetPassword),
  })

  const onSubmit: SubmitHandler<AuthResetPasswordType> = async (inputs, e) => {
    e?.preventDefault()
    try {
      await axios
        .post(`/api/reset-password`, inputs)
        .then((res: any) => {
          alert(JSON.stringify(res.data))
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
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='seu@email.com'
            />
          )}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </>
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
      <button type='submit'>Redefinir Senha</button>
    </form>
  )
}
